"use client";
import { useState, useEffect } from "react";

interface Message {
    role: string;
    content: string;
}

export default function GPT() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");

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

    const callGptApi = async (updatedMessages: Message[]) => {
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

    const handleClear = () => {
        setMessages([]);
        localStorage.removeItem("gptMessages");
    };

    return (
        <section className="h-full w-full flex flex-col justify-between bg-neutral-800">
            <div className="flex flex-col h-full p-4 overflow-y-auto  bg-no-repeat bg-center bg-[url('/gptLogo.png')] bg-[length:100px_100px] bg-neutral-800">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-2 py-4 px-8 rounded-3xl max-w-[45%] ${
                            message.role === "user"
                                ? "bg-neutral-700 self-end"
                                : "bg-neutral-700 self-start"
                        }`}
                    >
                        <strong>
                            {message.role === "assistant" ? "GPT" : ""}
                        </strong>
                        <p className="leading-8">

                        {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="p-4 border-2 border-gray-200 rounded-3xl bg-neutral-800"
            >
                <div className="flex gap-4 ">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md bg-neutral-700"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Send
                    </button>
                    <button
                        type="button"
                        onClick={handleClear}
                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Clear
                    </button>
                </div>
            </form>
        </section>
    );
}
