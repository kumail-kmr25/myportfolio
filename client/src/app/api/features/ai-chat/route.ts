import { NextResponse } from "next/server";
import { prisma } from "@portfolio/database";
export const dynamic = "force-dynamic";
import { apiResponse, apiError } from "@/lib/rate-limit";

export async function POST(request: Request) {
    try {
        const { message, history } = await request.json();
        
        if (!message) return apiError("Message required", 400);

        // Fetch AI Config
        const config = await prisma.aIChatConfig.findFirst();
        
        // Mocking AI Response logic
        // In a real scenario, you'd call OpenAI/Anthropic here using config.systemPrompt
        
        const lowerMsg = message.toLowerCase();
        let response = "That's a great question! I'm still learning Kumale's full history, but I'd be happy to connect you with him directly for more details.";

        if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("budget")) {
            response = "Project pricing varies based on complexity. Kumale specializes in high-performance web systems and AI integrations. For a precise estimate, feel free to use the 'ROI Engine' or the contact form!";
        } else if (lowerMsg.includes("offer") || lowerMsg.includes("service") || lowerMsg.includes("work")) {
            response = "Kumale offers Full-Stack Development, AI System Architecture, and Technical Consulting. You can see his flagship projects like CUE AI and MedQ AI in the Engineering Repository section!";
        } else if (lowerMsg.includes("availability") || lowerMsg.includes("hiring")) {
            response = "Kumale is currently open to high-impact projects. You can check his live telemetry status in the dashboard or send a deployment request directly!";
        } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
            response = config?.welcomeMessage || "Hello! I'm Kumale's AI assistant. How can I help you today?";
        }

        // Store conversation if we want to track leads (optional)
        // await prisma.aiChatConversation.create({...});

        return apiResponse({
            content: response,
            role: "assistant"
        });

    } catch (error) {
        console.error("AI Chat API error:", error);
        return apiError("Communication link interrupted", 500);
    }
}
