import { z } from "zod";

export const loginSchema =
  z.object({
    email: z
      .string()
      .email("Email inválido"),

    password: z
      .string()
      .min(
        6,
        "Senha deve possuir pelo menos 6 caracteres"
      ),
  });

export type LoginFormData =
  z.infer<
    typeof loginSchema
  >;