import { userSchema } from "@/schemas/user.schema";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("debe ser un email válido"),
  password: z
    .string("debe ser un string")
    .min(6, "la contraseña debe tener al menos 6 caracteres"),
});

export const loginResponseSchema = z.object({
  accessToken: z.string().optional(),
  currentUser: userSchema,
});

export type ILogin = z.infer<typeof loginSchema>;
export type ILoginResponse = z.infer<typeof loginResponseSchema>;
