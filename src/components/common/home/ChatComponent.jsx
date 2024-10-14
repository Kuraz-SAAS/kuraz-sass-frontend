import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useSiteStore } from "../../../context/siteStore";

const ChatComponent = ({ pdfFile }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const user = useSiteStore((store) => store.user);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAboutPdf = async (fileName, question, userId) => {
    try {
      setLoading(true); // Set loading to true to disable the button
      const response = await fetch("http://localhost:3000/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, question, userId }),
      });

      // Check for 429 response
      if (response.status === 429) {
        throw new Error("Exceeded limit, try in a few minutes please");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantResponse = ""; // Cumulative response

      // Add initial temporary bot message
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", id: "temp-bot" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log("Received chunk:", chunk); // Debug log
        assistantResponse += chunk;

        // Update the latest bot message in real-time as chunks are received
        setMessages((prevMessages) => {
          const tempBotMessage = prevMessages.find(
            (msg) => msg.id === "temp-bot"
          );
          if (tempBotMessage) {
            return prevMessages.map((msg) =>
              msg.id === "temp-bot" ? { ...msg, text: assistantResponse } : msg
            );
          }
          return prevMessages; // Return previous state if temp-bot message is not found
        });
      }

      // Final update to the bot message
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === "temp-bot" ? { ...msg, id: `bot-${Date.now()}` } : msg
        )
      );
    } catch (error) {
      console.error("Error occurred:", error.message);
      setMessages((prev) => [
        ...prev,
        { text: `${error.message}`, sender: "bot" },
      ]);
    } finally {
      setLoading(false); // Set loading back to false after the request is done
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const fileName = pdfFile;
      const userId = user?.user_id;

      setMessages((prev) => [...prev, { text: input, sender: "user" }]);

      askAboutPdf(fileName, input, userId);
      setInput("");
    }
  };

  // Update the formatAssistantMessage to add line numbers
  const formatAssistantMessage = (message) => {
    if (typeof message !== "string") {
      return "";
    }

    return message
      .split(/\r?\n/) // Split by newlines
      .map((line, index) => `${index + 1}. ${line}`) // Add line numbers
      .join("\n"); // Join them back with line breaks
  };

  return (
    <div className="flex flex-col h-full border bg-gray-100 rounded-b-lg w-[400px] shadow-md shadow-[#F3D598] border-gray-300 p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.sender === "bot" ? (
                <ReactMarkdown>
                  {formatAssistantMessage(msg.text)}
                </ReactMarkdown>
              ) : (
                <span style={{ whiteSpace: "pre-wrap" }}>{msg.text}</span>
              )}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-2">
            <span className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black">
              generating...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll reference */}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !loading) {
              handleSend();
            }
          }}
          disabled={loading} // Disable the input field while loading
        />
        <button
          className={`ml-2 p-2 rounded-lg ${
            loading ? "bg-gray-400" : "bg-primary"
          } text-white`}
          onClick={handleSend}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <div className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></div>
          ) : (
            <FaPaperPlane />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
