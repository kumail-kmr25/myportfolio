import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
import { apiResponse, apiError } from "@/lib/rate-limit";
import { openai } from "@/lib/openai";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    try {
        const { message, history } = await request.json();
        
        if (!message) return apiError("Message required", 400);

        // Fetch AI Config
        const config = await prisma.aIChatConfig.findFirst();
        const systemPrompt = config?.systemPrompt || "You are Kumail KMR's AI assistant. Answer professionally and help users understand Kumail's expertise in Full-Stack development and AI.";
        
        // Prepare messages for OpenAI
        const messages = [
            { role: "system", content: systemPrompt },
            ...(history || []).map((h: any) => ({
                role: h.role,
                content: h.content
            })),
            { role: "user", content: message }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Defaulting to 3.5-turbo for cost/speed, can be gpt-4
            messages: messages as any,
            max_tokens: 500,
            temperature: 0.7,
        });

        const responseContent = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that right now.";

        return apiResponse({
            content: responseContent,
            role: "assistant"
        });

    } catch (error) {
        console.error("AI Chat API error:", error);
        return apiError("Communication link interrupted", 500);
    }
}
