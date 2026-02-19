import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(1, "Title is required"),
    excerpt: z.string().min(1, "Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    category: z.string().min(1, "Category is required"),
    readTime: z.string().default("5 min read"),
    published: z.boolean().default(false),
});

export type BlogFormData = z.infer<typeof blogSchema>;
