import z from "zod";

export const registerSchema = z.object({
  userName: z.string("el nombre de usuario es obligatorio"),
  email: z.email("debe ser un email válido"),
  password: z.string("debe contener al menos 6 digitos").min(6),
});

export const registerResponseSchema = z.object({
  message: z.string().optional(),
});

export type IRegister = z.infer<typeof registerSchema>;
export type IRegisterResponse = z.infer<typeof registerResponseSchema>;
