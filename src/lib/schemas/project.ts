import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    image: z.string().url("Invalid image URL"),
    demo: z.string().url("Invalid demo URL").or(z.literal("#")),
    deployment: z.string().url("Invalid deployment URL").optional().or(z.literal("")),
    github: z.string().url("Invalid GitHub URL").or(z.literal("#")),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
