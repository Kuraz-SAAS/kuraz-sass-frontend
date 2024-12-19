import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useSiteStore } from "../../../context/siteStore";

const ChatComponent = ({ bookId }) => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [input, setInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const messagesEndRef = useRef(null); // Scroll reference
  const user = useSiteStore((store) => store.user); // Fetch user data

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to ask a question about the PDF
  const askAboutPdf = async (question) => {
    if (!question.trim()) return; // Prevent empty questions
    setLoading(true);

    try {
      // Add the user's question to the messages
      setMessages((prev) => [...prev, { text: question, sender: "user" }]);

      // Send the question to the backend
      const response = await fetch("http://localhost:3000/api/ask-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: "55ca0006-923e-4303-bf53-39ce01f79e14",
          question,
          userId: user?.user_id,
        }),
      });

      // Handle rate limits or HTTP errors
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Try again in a few minutes.");
      }
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      // Read and stream the response
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantResponse = "";

      // Add an initial placeholder for the bot's message
      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", id: "temp-bot" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        // Extract only "content" data from streamed lines
        lines.forEach((line) => {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.replace("data: ", "").trim());
              if (parsed.content) {
                assistantResponse += parsed.content;

                // Update the temporary bot message with streamed data
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === "temp-bot"
                      ? { ...msg, text: assistantResponse }
                      : msg
                  )
                );
              }
            } catch (err) {
              console.error("Error parsing chunk:", err);
            }
          }
        });
      }

      // Finalize the bot's message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "temp-bot" ? { ...msg, id: `bot-${Date.now()}` } : msg
        )
      );
    } catch (error) {
      console.error("Error:", error.message);
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
      askAboutPdf(input);
      setInput(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-[80vh] overflow-y-scroll border bg-gray-100 rounded-lg w-full max-w-md shadow-md p-4">
      {/* Messages Display */}
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
              {/* Render Markdown for assistant responses */}
              {msg.sender === "bot" ? (
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              ) : (
                <span>{msg.text}</span>
              )}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-2">
            <span className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black">
              Generating...
            </span>
          </div>
        )}
        <div ref={messagesEndRef} /> {/* Auto-scroll reference */}
      </div>

      {/* Input Field and Send Button */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          disabled={loading}
        />
        <button
          className={`ml-2 p-2 rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500"
          } text-white`}
          onClick={handleSend}
          disabled={loading}
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
