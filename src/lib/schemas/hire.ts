import { z } from "zod";

export const hireSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    company: z.string().optional(),
    selectedService: z.enum([
        "Web Development (Full Stack)",
        "Frontend Development (React/Next.js)",
        "Backend Development (Node.js/Prisma)",
        "UI/UX Design & Prototyping",
        "Performance Optimization",
        "Bug Fixing & Error Resolution",
        "Other"
    ]),
    budgetRange: z.enum([
        "₹10,000 – ₹25,000",
        "₹25,000 – ₹50,000",
        "₹50,000 – ₹1,00,000",
        "₹1,00,000+",
        "Flexible / To be discussed"
    ]),
    timeline: z.enum([
        "Urgent (less than 1 week)",
        "1–2 weeks",
        "1 month",
        "2–3 months",
        "Flexible"
    ]),
    projectType: z.enum([
        "New Project from scratch",
        "Existing Project (Maintenance/Update)",
        "Long-term Partnership",
        "Consulting",
        "Other"
    ]),
    description: z.string()
        .min(20, "Project details must be at least 20 characters")
        .max(3000, "Description must be less than 3000 characters"),
    source: z.string().default("hire_me"),
});

export type HireFormData = z.infer<typeof hireSchema>;
