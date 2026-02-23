/**
 * Standalone script to test SMS sending.
 * Run with: npx ts-node src/lib/test-sms.ts
 * (Or if ts-node is not available, use node on the compiled version)
 */

import { sendRegistrationSMS } from "./sms";
import dotenv from "dotenv";
import path from "path";

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

async function test() {
    console.log("🚀 Starting SMS Test...");

    const testPhone = process.env.ADMIN_PHONE || "6006121193";

    try {
        const success = await sendRegistrationSMS({
            to: testPhone,
            userId: "TEST-12345",
            password: "TestPassword!123"
        });

        if (success) {
            console.log("✅ Test execution finished. Check console above for details (Real SMS vs Fallback).");
        } else {
            console.error("❌ Test execution failed.");
        }
    } catch (error) {
        console.error("❌ Unexpected error during test:", error);
    }
}

test();
