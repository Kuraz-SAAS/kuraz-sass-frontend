import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending a question to the backend
  const askAboutPdf = async (fileName, question, userId) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, question, userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      // Start the message with an empty string for the bot's response
      let assistantResponse = "";

      // Add a placeholder for the bot's response in the chat
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", id: "temp-bot" }, // Temporarily add bot message with an empty response
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;

        // Update the latest bot message in real-time as chunks are received
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === "temp-bot" ? { ...msg, text: assistantResponse } : msg
          )
        );
      }

      // Once the full response is received, update the message id to indicate it's complete
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === "temp-bot" ? { ...msg, id: `bot-${Date.now()}` } : msg
        )
      );
    } catch (error) {
      console.error("Error occurred:", error.message);
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${error.message}`, sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const fileName = "test.pdf"; // Replace with your actual PDF file name
      const userId = "user123"; // Replace with the actual user ID

      // Add user's message to the chat
      setMessages((prev) => [...prev, { text: input, sender: "user" }]);

      // Call the askAboutPdf function to handle the bot's response
      askAboutPdf(fileName, input, userId);

      setInput(""); // Clear the input after sending
    }
  };

  // Function to format the assistant's response text with preserved whitespace and newlines
  const formatAssistantMessage = (message) => {
    if (typeof message !== "string") {
      return ""; // Return an empty string if it's not a string
    }

    return message
      ?.replace(/</g, "&lt;") // Escape HTML
      ?.replace(/>/g, "&gt;")
      ?.replace(/(?:\r\n|\r|\n)/g, "\n"); // Convert new lines to \n for Markdown
  };

  return (
    <div className="flex flex-col h-[80vh] border-l bg-gray-100 rounded-lg w-[500px] border-gray-300 p-4">
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
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
