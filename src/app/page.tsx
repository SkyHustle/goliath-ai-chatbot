import Image from "next/image";
import { ChatBot } from "@/components/ChatBot";
import Vision from "@/components/Vision";

export default function Home() {
    return (
        <main className="flex flex-col items-center p-32">
            <ChatBot />
            <Vision />
        </main>
    );
}
