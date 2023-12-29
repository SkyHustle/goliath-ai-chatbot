import Image from "next/image";
import { ChatBot } from "@/components/ChatBot";
import ChatCompletion from "@/components/ChatCompletion";
import Chat from "@/components/Chat";

export default function Home() {
    return (
        <main className="flex flex-col items-center p-32">
            <ChatBot />
        </main>
    );
}
