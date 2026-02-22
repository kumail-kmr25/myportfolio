import { z } from "zod";

export const siteStatsSchema = z.object({
    totalProjects: z.number().int().nonnegative().optional(),
    bugsFixed: z.number().int().nonnegative().optional(),
    yearsLearning: z.number().int().nonnegative().optional(),
    deploymentCount: z.number().int().nonnegative().optional(),
});
