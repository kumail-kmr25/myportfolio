import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional().or(z.literal("")),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["Production", "Beta", "Concept"]).default("Production"),
    role: z.string().optional().or(z.literal("")),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    image: z.string().url("Invalid image URL"),
    demo: z.string().url("Invalid demo URL").optional().or(z.literal("#")),
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal("#")),

    // Case Study
    problem: z.string().optional().or(z.literal("")),
    solution: z.string().optional().or(z.literal("")),
    targetAudience: z.string().optional().or(z.literal("")),
    valueProp: z.string().optional().or(z.literal("")),

    architecture: z.any().optional(), // Can be refined later

    challenges: z.string().optional().or(z.literal("")),
    engineering: z.string().optional().or(z.literal("")),
    performance: z.string().optional().or(z.literal("")),
    scalability: z.string().optional().or(z.literal("")),
    security: z.string().optional().or(z.literal("")),
    lessons: z.string().optional().or(z.literal("")),

    // Depth Indicators
    uiDepth: z.number().min(0).max(100).default(0),
    backendDepth: z.number().min(0).max(100).default(0),
    securityDepth: z.number().min(0).max(100).default(0),
    scalabilityDepth: z.number().min(0).max(100).default(0),

    // Compatibility
    beforeImageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
    afterImageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
    improvementDetails: z.string().optional().or(z.literal("")),
    metrics: z.array(z.string()).optional().default([]),
    decisionLogs: z.array(z.string()).optional().default([]),
    isVisible: z.boolean().default(true),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
