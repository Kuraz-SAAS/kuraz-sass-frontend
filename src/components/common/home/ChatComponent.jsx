import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import BouncingDotsLoader from "./BouncingDotsLoader";
import { useSiteStore } from "../../../context/siteStore";
import ReactMarkdown from "react-markdown";

const ChatComponent = ({ pdfName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(null);
  const user = useSiteStore((store) => store.user);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  };

  // Load messages from sessionStorage when component mounts
  useEffect(() => {
    const savedMessages = sessionStorage.getItem(`chat_${pdfName}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [pdfName]);

  // Save messages to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem(`chat_${pdfName}`, JSON.stringify(messages));
  }, [messages, pdfName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const askAboutPdf = async (question) => {
    if (!question.trim()) return;
    setLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { text: question, sender: "user" }]);

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    try {
      const response = await fetch("http://localhost:3000/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId: pdfName,
          userMessage: question,
          userId: user?.user_id,
        }),
        signal,
      });

      if (!response.ok) throw new Error("Failed to fetch response.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = "";
      let botMessageId = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botMessage += chunk;

        if (!botMessageId) {
          botMessageId = `bot-${Date.now()}`;
          setMessages((prev) => [
            ...prev,
            { text: botMessage, sender: "bot", id: botMessageId },
          ]);
        } else {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: botMessage } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error retrieving response.", sender: "bot", id: `error-${Date.now()}` },
      ]);
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

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-[500px] h-[75vh] flex flex-col justify-end shadow-lg">
      <CardContent className="flex flex-col overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) =>
          msg.text ? (
            <div
              key={index}
              className={`p-2 rounded-b-lg min-w-[20%] ${msg.sender === "user"
                  ? "bg-black text-white self-end"
                  : "bg-gray-200 text-black self-start"
                }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ) : null
        )}
        <div className="justify-items-start mt-3">
            {loading && <BouncingDotsLoader />}
        </div>
        <div ref={messagesEndRef} />
      </CardContent>

      <CardFooter className="p-4 flex items-center gap-2">
        <Textarea
          ref={textareaRef}
          className="flex-1 resize-none overflow-y-hidden"
          placeholder="Type a message..."
          value={input}
          rows={2}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleSend} disabled={loading}>
          <FaPaperPlane />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatComponent;
