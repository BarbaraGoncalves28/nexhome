"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

type LoginData = {
  email: string;
  password: string;
};

export async function loginUser(
  data: LoginData
) {
  const user = await prisma.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "E-mail ou senha inválidos",
    };
  }

  const passwordMatch =
    await bcrypt.compare(
      data.password,
      user.password
    );

  if (!passwordMatch) {
    return {
      success: false,
      message: "E-mail ou senha inválidos",
    };
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return {
    success: true,
  };
}