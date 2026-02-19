/**
 * SMS notification helper.
 * Uses Twilio REST API if credentials are provided, otherwise logs to console.
 */

interface SMSPayload {
    to: string;
    userId: string;
    password: string;
}

export async function sendRegistrationSMS({ to, userId, password }: SMSPayload): Promise<boolean> {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    const message = `🔐 Admin Registration Successful!\n\nYour Credentials:\nUser ID: ${userId}\nPassword: ${password}\n\nKeep this safe. Do not share.`;

    // If Twilio credentials are missing, log to console as fallback
    if (!accountSid || !authToken || !fromNumber) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📱 SMS NOTIFICATION (Console Fallback)");
        console.log(`   To: +91${to}`);
        console.log(`   User ID: ${userId}`);
        console.log(`   Password: ${password}`);
        console.log("   ⚠️  Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,");
        console.log("      and TWILIO_PHONE_NUMBER in .env for real SMS.");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        return true;
    }

    try {
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

        if (!response.ok) {
            const error = await response.json();
            console.error("Twilio SMS error:", error);
            return false;
        }

        console.log(`✅ SMS sent to +91${to}`);
        return true;
    } catch (error) {
        console.error("SMS sending failed:", error);
        return false;
    }
}
