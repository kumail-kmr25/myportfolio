import { z } from "zod";

export const featureRequestSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Feature idea must be at least 10 characters"),
    category: z.enum(["UI", "Performance", "New Tool", "Other"]),
    status: z.enum(["pending", "building", "completed"]).optional(),
});
