import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages, data } = await req.json();

    const initialMessages = messages.slice(0, -1);
    const currentMessage = messages[messages.length - 1];

    console.log("initial Messages ", initialMessages);
    console.log("current Messages ", currentMessage);

    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 150,
        messages: [
            ...initialMessages,
            {
                ...currentMessage,
                content: [
                    { type: "text", text: currentMessage.content },

                    // forward the image information to OpenAI:
                    {
                        type: "image_url",
                        image_url: data.imageUrl,
                    },
                ],
            },
        ],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}