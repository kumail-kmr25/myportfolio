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
        "Bug Fix / Optimization",
        "Database System",
        "API Development",
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
    source: z.string(),
});

export type HireFormData = z.infer<typeof hireSchema>;
