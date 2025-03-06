import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaStopCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { useSiteStore } from "../../../context/siteStore";

const ChatComponent = ({ bookId, pdfName }) => {
  const [messages, setMessages] = useState([]); // Chat messages
  const [input, setInput] = useState(""); // User input
  const [loading, setLoading] = useState(false); // Loading state
  const messagesEndRef = useRef(null); // Scroll reference
  const controllerRef = useRef(null); // Request controller
  const user = useSiteStore((store) => store.user); // Fetch user data

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAboutPdf = async (question) => {
    if (!question.trim()) return;
    setLoading(true);

    // Create an AbortController to allow request cancellation
    controllerRef.current = new AbortController();
    const { signal } = controllerRef.current;

    try {
      setMessages((prev) => [...prev, { text: question, sender: "user" }]);

      const response = await fetch("https://chat.saas.kuraztech.com/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: pdfName,
          question,
          userId: user?.user_id,
        }),
        signal, // Attach the signal for cancellation
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Try again in a few minutes.");
      }
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let assistantResponse = "";

      setMessages((prev) => [
        ...prev,
        { text: "", sender: "bot", id: "temp-bot" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === "temp-bot" ? { ...msg, text: assistantResponse } : msg
          )
        );
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === "temp-bot" ? { ...msg, id: `bot-${Date.now()}` } : msg
        )
      );
    } catch (error) {
      if (error.name === "AbortError") {
        setMessages((prev) => prev.filter((msg) => msg.id !== "temp-bot")); // Remove temp message
      } else {
        setMessages((prev) => [
          ...prev,
          { text: `Error: ${error.message}`, sender: "bot" },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      askAboutPdf(input);
      setInput("");
    }
  };

  const handleStop = () => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel the request
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[80vh] overflow-y-scroll border bg-gray-100 rounded-lg w-full max-w-lg shadow-md p-4">
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
        <div ref={messagesEndRef} />
      </div>

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

        {loading ? (
          <button
            className="ml-2 p-2 rounded-lg bg-red-500 text-white"
            onClick={handleStop}
          >
            <FaStopCircle size={20} />
          </button>
        ) : (
          <button
            className="ml-2 p-2 rounded-lg bg-blue-500 text-white"
            onClick={handleSend}
            disabled={loading}
          >
            <FaPaperPlane />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
