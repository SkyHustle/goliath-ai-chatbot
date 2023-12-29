"use client";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Trash, Bot } from "lucide-react";
import { useChat } from "ai/react";
import { Message } from "ai";

export function ChatBot() {
    const { messages, error, isLoading, input, setMessages, handleInputChange, handleSubmit } = useChat();

    // ref allows us to access a HTML Element Directly
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open ChatBot</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerClose asChild></DrawerClose>
                <div className="flex h-[600px] w-[400px] flex-col">
                    <div
                        className="mt-3 h-full overflow-y-auto px-3"
                        // ref={scrollRef}
                    >
                        {messages.map((message) => (
                            <ChatMessage message={message} key={message.id} />
                        ))}

                        {messages.length === 0 && (
                            <div className="flex h-full items-center justify-center gap-3">
                                <Bot />
                                Ask Ai a question
                            </div>
                        )}
                    </div>
                    {/* Regular HTML form, don't need input validation, form logic handled by vercel ai SDK */}
                    <form onSubmit={handleSubmit} className="m-3 flex gap-1">
                        {/* shadcn Input and Button look better */}
                        <Button
                            title="Clear Chat"
                            variant="outline"
                            size="icon"
                            className="shrink-0"
                            type="button"
                            onClick={() => setMessages([])}
                        >
                            <Trash />
                        </Button>
                        <Input
                            autoFocus={true}
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Ask a question..."
                            // ref={inputRef}
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

function ChatMessage({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {
    const isAiMessage = role === "assistant";

    return (
        <div className={cn("mb-3 flex items-center", isAiMessage ? "me-5 justify-start" : "ms-5 justify-end")}>
            {isAiMessage && <Bot className="mr-2 shrink-0" />}
            <p
                className={cn(
                    "whitespace-pre-line rounded-md border px-3 py-2",
                    isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
                )}
            >
                {content}
            </p>
        </div>
    );
}
