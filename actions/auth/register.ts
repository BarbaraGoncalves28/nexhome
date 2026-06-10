"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/validations/register-schema";

type RegisterState = {
  success: boolean;
  message: string;
};

export async function registerUser(
  data: unknown
): Promise<RegisterState> {
  try {
    const parsedData =
      registerSchema.parse(data);

    const existingUser =
      await prisma.users.findUnique({
        where: {
          email: parsedData.email,
        },
      });

    if (existingUser) {
      return {
        success: false,
        message: "E-mail já cadastrado",
      };
    }

    const hashedPassword =
      await bcrypt.hash(
        parsedData.password,
        10
      );

    await prisma.users.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Usuário cadastrado com sucesso",
    };
  } catch {
    return {
      success: false,
      message: "Erro ao cadastrar usuário",
    };
  }
}