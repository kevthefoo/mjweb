"use client";
import { useState } from "react";

export default function GPT() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Return if the input is empty
        if (!input.trim()) {
            return;
        }

        // Add user's message to the chat
        setMessages((prevMessages) => [...prevMessages, `User: ${input}`]);

        try {
            // Call GPT API (replace with your actual API call)
            const response = await fetch("/api/gpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) {
                throw new Error("Failed to call GPT API");
            }

            const data = await response.json();
            // Add GPT's response to the chat
            setMessages((prevMessages) => [
                ...prevMessages,
                `GPT: ${data.result.content}`,
            ]);

            // Clear the input field
            setInput("");
            console.log(response.status);
        } catch (error) {
            console.error(error);
            return;
        }
    };

    return (
        <section className="h-full w-full flex flex-col justify-between">
            <div className="flex-grow p-4 overflow-y-auto border-2 border-red-500 bg-no-repeat bg-center bg-[url('/gptLogo.png')] bg-[length:100px_100px]">
                {messages.map((message, index) => (
                    <div key={index} className="mb-2">
                        {message}
                    </div>
                ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="p-4 border-2 border-gray-200"
            >
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-800"
                        placeholder="Type your message..."
                    />
                    <button
                        type="submit"
                        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </form>
        </section>
    );
}
