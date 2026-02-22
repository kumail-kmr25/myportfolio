import { z } from "zod";

export const caseStudySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    errorMessage: z.string().min(1, "Error message is required"),
    rootCause: z.string().min(5, "Root cause analysis is required"),
    steps: z.array(z.string()).min(1, "At least one debugging step is required"),
    solution: z.string().min(5, "Solution is required"),
    impact: z.string().min(5, "Impact description is required"),
    techStack: z.array(z.string()).min(1, "At least one tech stack item is required"),
    isPublished: z.boolean().default(false),
});
