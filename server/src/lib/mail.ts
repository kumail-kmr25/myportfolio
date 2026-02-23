import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function sendContactNotification({
  name,
  email,
  company,
  inquiryType,
  serviceRequired,
  budgetRange,
  timeline,
  message,
}: {
  name: string;
  email: string;
  company?: string | null;
  inquiryType: string;
  serviceRequired: string;
  budgetRange?: string;
  timeline?: string;
  message: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email notification skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Transition to custom domain in production
      to: process.env.CONTACT_EMAIL || "ka6307464@gmail.com",
      subject: `💼 New Professional Inquiry from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ""}
          </div>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Reason for Contact:</strong> ${inquiryType}</p>
            <p style="margin: 5px 0;"><strong>Service Required:</strong> ${serviceRequired}</p>
            <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${budgetRange}</p>
            <p style="margin: 5px 0;"><strong>Project Timeline:</strong> ${timeline}</p>
          </div>

          <div style="padding: 15px; border-left: 4px solid #3b82f6; background: #eff6ff; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Project Details:</strong></p>
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; pt: 10px;">
            Submitted via Portfolio Contact Form at ${new Date().toLocaleString()}
          </p>
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

export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Reset email skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "🔐 Password Reset Request",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">Password Reset Request</h2>
          
          <p>Hello,</p>
          <p>You are receiving this email because a password reset request was made for your admin account.</p>
          
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
          </div>

          <p>This link will expire in 15 minutes. If you did not request a password reset, no further action is required.</p>
          
          <p style="font-size: 13px; color: #666; margin-top: 30px;">
            If you're having trouble clicking the button, copy and paste the URL below into your web browser:
          </p>
          <p style="font-size: 11px; word-break: break-all; color: #888;">
            ${resetUrl}
          </p>

          <p style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            Submitted via Portfolio Admin System at ${new Date().toLocaleString()}
          </p>
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

export async function sendAutoReplyToClient(email: string, name: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Auto-reply skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Kumail Kmr <onboarding@resend.dev>", // Transition to your custom domain email
      to: email,
      subject: "Thanks for contacting Kumail Kmr 🚀",
      html: `
        <div style="font-family: sans-serif; padding: 30px; color: #333; line-height: 1.8; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #000; font-size: 24px; margin-bottom: 20px;">Hello ${name},</h2>
          
          <p>Thank you for reaching out through my portfolio! I've successfully received your inquiry.</p>
          
          <p>I usually review my messages daily and will get back to you within <strong>24–48 hours</strong> with a detailed response.</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <p style="margin: 0; color: #1e40af; font-weight: 500;">
              "Looking forward to potentially collaborating and bringing your vision to life!"
            </p>
          </div>

          <p>In the meantime, feel free to check out my latest work on <a href="https://github.com/kumail-kmr25" style="color: #3b82f6; text-decoration: none;">GitHub</a>.</p>
          
          <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 14px; color: #666;">
            Best Regards,<br/>
            <strong>Kumail Kmr</strong><br/>
            Full-Stack Developer
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend auto-reply error:", error);
    }

    return data;
  } catch (error) {
    console.error("Auto-reply mail utility error:", error);
  }
}

export async function sendHireNotification({
  name,
  email,
  company,
  selectedService,
  budgetRange,
  timeline,
  projectType,
  description,
}: {
  name: string;
  email: string;
  company?: string | null;
  selectedService: string;
  budgetRange: string;
  timeline: string;
  projectType: string;
  description: string;
}) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email notification skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Portfolio Hire <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "ka6307464@gmail.com",
      subject: `🚀 New Project Inquiry: ${selectedService} from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Hire Request</h2>
          
          <div style="margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Client Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Client Email:</strong> ${email}</p>
            ${company ? `<p style="margin: 5px 0;"><strong>Company:</strong> ${company}</p>` : ""}
          </div>

          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Service Requested:</strong> ${selectedService}</p>
            <p style="margin: 5px 0;"><strong>Project Type:</strong> ${projectType}</p>
            <p style="margin: 5px 0;"><strong>Budget Range:</strong> ${budgetRange}</p>
            <p style="margin: 5px 0;"><strong>Timeline:</strong> ${timeline}</p>
          </div>

          <div style="padding: 15px; border-left: 4px solid #10b981; background: #ecfdf5; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Project Description:</strong></p>
            <p style="white-space: pre-wrap; margin: 0;">${description}</p>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 10px;">
            Submitted via Portfolio "Hire Me" Flow at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
    }

    return data;
  } catch (error) {
    console.error("Mail utility error (Hire Notification):", error);
  }
}

export async function sendHireAutoReply(email: string, name: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Auto-reply skipped.");
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Kumail Kmr <onboarding@resend.dev>",
      to: email,
      subject: "Exciting! I've received your project request 🚀",
      html: `
        <div style="font-family: sans-serif; padding: 30px; color: #333; line-height: 1.8; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 12px;">
          <h2 style="color: #000; font-size: 24px; margin-bottom: 20px;">Hello ${name},</h2>
          
          <p>Thank you for expressing interest in working with me! I've received your project details and I'm already getting excited about the possibilities.</p>
          
          <p>I take every hire request seriously. I'll review your requirements, budget, and timeline within the next <strong>24 hours</strong> and reach out to schedule a brief discovery call if it's a good fit.</p>
          
          <div style="margin: 30px 0; padding: 20px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #065f46; font-weight: 500;">
              "Let's build something exceptional together."
            </p>
          </div>

          <p>In the meantime, you can explore my previous work and case studies on my portfolio.</p>
          
          <p style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px; font-size: 14px; color: #666;">
            Best Regards,<br/>
            <strong>Kumail Kmr</strong><br/>
            Full-Stack Developer & Technical Lead
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend auto-reply error:", error);
    }

    return data;
  } catch (error) {
    console.error("Auto-reply mail utility error (Hire Auto-reply):", error);
  }
}
