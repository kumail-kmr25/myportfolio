import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function sendContactNotification({
    name,
    email,
    message,
}: {
    name: string;
    email: string;
    message: string;
}) {
    if (!resend) {
        console.warn("RESEND_API_KEY is not set. Email notification skipped.");
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: "Portfolio <onboarding@resend.dev>", // Transition to custom domain in production
            to: process.env.CONTACT_EMAIL || "kumailkmr25@gmail.com",
            subject: `New Contact Form Submission from ${name}`,
            replyTo: email,
            html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000;">New Message from Portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 8px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">Submitted at ${new Date().toLocaleString()}</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
        }

        return data;
    } catch (error) {
        console.error("Mail utility error:", error);
    }
}
