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

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
};

const messagesExample: Message[] = [
    {
        content: "Hey there",
        role: "user",
        createdAt: "2023-12-27T23:44:12.590Z",
        id: "OZ2xRyO",
    },
    {
        id: "a1scQIm",
        createdAt: "2023-12-27T23:44:16.254Z",
        content: "Hello! How can I assist you today?",
        role: "assistant",
    },
    {
        content: "I want to put out the trash",
        role: "user",
        createdAt: "2023-12-27T23:44:29.406Z",
        id: "ubbOGzY",
    },
    {
        id: "z7CH5Vb",
        createdAt: "2023-12-27T23:44:30.691Z",
        content:
            "That's great! Putting out the trash regularly is an important task. It's good that you have a specific schedule for trash collection every Monday. Just make sure to gather all the trash bags and take them out to the designated area or bin before the collection time. If you have any other questions or need further assistance, feel free to ask!",
        role: "assistant",
    },
    {
        content: "Thanks",
        role: "user",
        createdAt: "2023-12-27T23:44:37.361Z",
        id: "JDbMmkK",
    },
    {
        id: "XP9EBet",
        createdAt: "2023-12-27T23:44:38.454Z",
        content:
            "You're welcome! If you have any more questions or need assistance with anything else, feel free to ask.",
        role: "assistant",
    },
];

export function ChatBot() {
    const [messages, setMessages] = useState(messagesExample);
    const [input, setInput] = useState("");

    // ref allows us to access a HTML Element Directly
    const inputRef = useRef<HTMLInputElement>(null);

    function handleClearChat() {
        setMessages([]);
        // After clearing the chat, focus the input field
        inputRef.current?.focus();
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessages([...messages, { id: "1", role: "user", content: input, createdAt: "2023-12-27T23:44:12.590Z" }]);
        setInput("");
        // After submitting the form, focus the input field
        inputRef.current?.focus();
    }

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
                            onClick={handleClearChat}
                        >
                            <Trash />
                        </Button>
                        <Input
                            autoFocus={true}
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask away"
                            ref={inputRef}
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
