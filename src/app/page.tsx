import Image from "next/image";
import { ChatBot } from "@/components/ChatBot";
import ChatCompletion from "@/components/ChatCompletion";

export default function Home() {
    return (
        <main className="flex flex-col items-center p-32">
            <ChatBot />
            <ChatCompletion />
        </main>
    );
}
