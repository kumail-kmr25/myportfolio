import { apiResponse } from "@/lib/rate-limit";
export const runtime = "nodejs";
export async function GET() {
    return apiResponse({ status: "ok", message: "Deployment check: v1.0.1", timestamp: new Date().toISOString() });
}
