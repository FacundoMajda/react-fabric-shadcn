import z from "zod";

export const commonSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
