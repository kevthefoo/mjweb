"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: string;
  content: string;
}

export default function GPT() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("gptMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem("gptMessages", JSON.stringify(messages));
  }, [messages]);

  // Handle user's prompt submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Return if the input is empty
    if (!input.trim()) {
      return;
    }

    // Create the new message
    const newMessage = { role: "user", content: input };

    // Add user's message to the chat
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      // Call GPT API with the updated messages
      callGptApi(updatedMessages);
      return updatedMessages;
    });

    // Clear the input field
    setInput("");
  };

  // Call GPT API
  const callGptApi = async (updatedMessages: Message[]) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to call GPT API");
      }

      setIsLoading(false);

      const data = await response.json();
      // Add GPT's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: data.result.content },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // Clear the chat messages
  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem("gptMessages");
  };

  return (
    <section className="flex h-full w-full flex-col justify-between bg-neutral-800">
      <div className="flex h-full flex-col overflow-y-auto bg-neutral-800 bg-[url('/gptLogo.png')] bg-[length:100px_100px] bg-center bg-no-repeat p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 max-w-[70%] rounded-3xl px-8 py-4 ${
              message.role === "user"
                ? "self-end bg-neutral-700"
                : "self-start bg-neutral-700"
            }`}
          >
            <strong>{message.role === "assistant" ? "GPT" : ""}</strong>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div className="mb-2 w-72 self-start rounded-3xl bg-neutral-700 px-8 py-4">
            <p className="typing leading-8"></p>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border-2 border-gray-200 bg-neutral-800 p-4"
      >
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow rounded-md border border-gray-300 bg-neutral-700 p-2"
            placeholder="Ask me something..."
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            Send
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      </form>
    </section>
  );
}
