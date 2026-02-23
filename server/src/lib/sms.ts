/**
 * SMS notification helper using Fast2SMS (India) with Twilio fallback.
 * Fast2SMS is free for Indian numbers — get API key at https://www.fast2sms.com
 */

interface SMSPayload {
    to: string;
    userId: string;
    password: string;
}

export async function sendRegistrationSMS({ to, userId, password }: SMSPayload): Promise<boolean> {
    const message = `Admin Registration Successful! Your User ID: ${userId} | Password: ${password} — Keep this safe. Do not share.`;

    console.log(`[SMS Service] Attempting to send credentials to ${to}...`);

    // Try Fast2SMS first (best for Indian numbers)
    const fast2smsKey = process.env.FAST2SMS_API_KEY;
    if (fast2smsKey && fast2smsKey !== "your_key_here") {
        try {
            console.log(`[SMS Service] Using Fast2SMS...`);
            const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
                method: "POST",
                headers: {
                    "authorization": fast2smsKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    route: "q",
                    message,
                    language: "english",
                    flash: 0,
                    numbers: to.replace(/^\+91/, ""),
                }),
            });

            const data = await response.json();
            if (data.return) {
                console.log(`✅ SMS sent to ${to} via Fast2SMS (ReqId: ${data.request_id})`);
                return true;
            } else {
                console.error("❌ Fast2SMS error:", data.message || data);
            }
        } catch (error) {
            console.error("❌ Fast2SMS fetch failed:", error);
        }
    } else {
        console.log(`[SMS Service] Fast2SMS key not configured.`);
    }

    // Fallback: Twilio
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (accountSid && authToken && fromNumber && accountSid !== "your_sid_here") {
        try {
            console.log(`[SMS Service] Using Twilio fallback...`);
            const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
            const formattedTo = to.startsWith("+") ? to : `+91${to}`;

            const body = new URLSearchParams({
                To: formattedTo,
                From: fromNumber,
                Body: message,
            });

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (response.ok) {
                console.log(`✅ SMS sent to ${formattedTo} via Twilio`);
                return true;
            }
            const error = await response.json();
            console.error("❌ Twilio SMS error:", error);
        } catch (error) {
            console.error("❌ Twilio fetch failed:", error);
        }
    } else {
        console.log(`[SMS Service] Twilio not configured.`);
    }

    // Final fallback: console log
    console.log("\n" + "=".repeat(40));
    console.log("📱 SMS NOTIFICATION (DEVELOPMENT FALLBACK)");
    console.log(`   To: ${to}`);
    console.log(`   User ID: ${userId}`);
    console.log(`   Password: ${password}`);
    console.log("-".repeat(40));
    console.log("   ⚠️  REAL SMS NOT SENT.");
    console.log("   Action Required: Set FAST2SMS_API_KEY in .env");
    console.log("   Get free key: https://www.fast2sms.com");
    console.log("=".repeat(40) + "\n");

    return true;
}
