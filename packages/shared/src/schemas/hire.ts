import { z } from "zod";

export const hireSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    company: z.string().default(""),
    selectedService: z.enum([
        "Website Development",
        "Web Application",
        "SaaS Platform",
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Bug Fix / Optimization",
        "Database Design",
        "DevOps / Cloud",
        "Other"
    ]),
    projectType: z.enum([
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "DevOps / Cloud",
        "Database Design",
        "Bug Fix / Error Optimization",
        "Website Development",
        "Web Application",
        "Other"
    ]),
    budgetRange: z.enum([
        "Under $500",
        "$500 – $1000",
        "$1000 – $3000",
        "$3000+"
    ]),
    timeline: z.enum([
        "ASAP",
        "1–2 weeks",
        "1 month",
        "Flexible"
    ]),
    description: z.string()
        .min(10, "Project details must be at least 10 characters")
        .max(3000, "Description must be less than 3000 characters"),
    referenceLink: z.string().url("Invalid URL format").optional().or(z.literal("")),
    contactMethod: z.enum(["Email", "LinkedIn", "WhatsApp"]),
    source: z.string().default("hire_me"),
});

export type HireFormData = z.infer<typeof hireSchema>;
