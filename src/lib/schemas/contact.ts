import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    company: z.string().optional(),
    inquiryType: z.enum([
        "Internship Opportunity",
        "Full-Time Role",
        "Freelance Project",
        "Technical Inquiry",
        "Bug Fix / Error Resolution",
        "Performance Optimization",
        "API Integration",
        "Collaboration",
        "Other"
    ]),
    serviceRequired: z.enum([
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "DevOps / Cloud",
        "Database Design",
        "Bug Fix / Error Optimisation",
        "Performance Tuning",
        "Other"
    ]),
    budgetRange: z.enum([
        "Below ₹10,000",
        "₹10,000 – ₹50,000",
        "₹50,000+",
        "Discuss Later"
    ]).optional(),
    timeline: z.enum([
        "Urgent (1–3 days)",
        "1–2 weeks",
        "1 month",
        "Flexible"
    ]).optional(),
    message: z.string()
        .min(20, "Project details must be at least 20 characters")
        .max(2000, "Message must be less than 2000 characters"),
    foundBy: z.enum([
        "LinkedIn",
        "X (Twitter)",
        "GitHub",
        "Referral",
        "Google Search",
        "Other"
    ]).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
