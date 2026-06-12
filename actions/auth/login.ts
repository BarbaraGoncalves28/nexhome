"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user =
    await prisma.users.findUnique({
      where: {
        email,
      },
    });

  if (!user) {
    return {
      success: false,
      message:
        "Usuário não encontrado",
    };
  }

  const passwordMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!passwordMatch) {
    return {
      success: false,
      message:
        "Senha incorreta",
    };
  }

  const token =
    generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as
        | "ADMIN"
        | "BROKER"
        | "CLIENT",
    });

  const cookieStore =
    await cookies();

  cookieStore.set(
    "auth_token",
    token,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        60 * 60 * 24 * 7,
    }
  );

  return {
    success: true,
    message:
      "Login realizado com sucesso",
  };
}