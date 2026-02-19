import { z } from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    company: z.string().max(100, "Company name too long").optional().nullable(),
    relationship_type: z.enum([
        "Freelance Client",
        "Internship Mentor",
        "Hackathon Teammate",
        "Open Source Collaborator",
        "Hiring Manager",
        "Other"
    ]),
    intervention_type: z.enum([
        "UI/UX Design",
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "DevOps / Cloud",
        "Database Design",
        "Bug Fix / Error Optimisation",
        "Performance Optimization",
        "API Integration",
        "Other"
    ]),
    rating: z.number().min(1).max(7, "Rating must be between 1 and 7"),
    message: z.string()
        .min(20, "Testimonial must be at least 20 characters")
        .max(500, "Testimonial must be less than 500 characters"),
    about_delivery_lead: z.string().min(2, "Please provide feedback on communication/delivery"),
    permission: z.boolean().refine(val => val === true, {
        message: "Permission to display publicly is required"
    })
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;
