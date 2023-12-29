"use client";

import { useChat } from "ai/react";

export default function Vision() {
    const { messages, input, handleInputChange, handleSubmit } = useChat({ api: "/api/vision" });

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            {messages.length > 0
                ? messages.map((m) => (
                      <div key={m.id} className="whitespace-pre-wrap">
                          {m.role === "user" ? "User: " : "AI: "}
                          {m.content}
                      </div>
                  ))
                : null}

            <form
                onSubmit={(e) => {
                    handleSubmit(e, {
                        data: {
                            imageUrl:
                                "https://images.unsplash.com/photo-1524450239752-ddd212cac0b4?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        },
                    });
                }}
            >
                <input
                    className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                    value={input}
                    placeholder="What does the image show..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}
