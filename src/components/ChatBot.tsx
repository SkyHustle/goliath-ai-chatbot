"use client";
import { useEffect, useRef } from "react";
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
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Open ChatBot</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerClose asChild></DrawerClose>
                <div className="flex h-[600px] w-[400px] flex-col">
                    <div className="mt-3 h-full overflow-y-auto px-3" ref={scrollRef}>
                        {messages.map((message) => (
                            <ChatMessage message={message} key={message.id} />
                        ))}

                        {!error && messages.length === 0 && (
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
                            ref={inputRef}
                        />
                        <Button className="flex items-center justify-center" disabled={isLoading} type="submit">
                            {isLoading ? (
                                <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : (
                                "Send"
                            )}
                        </Button>
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
