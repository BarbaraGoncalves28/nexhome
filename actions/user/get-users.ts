"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getUsers() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  if (!token) {
    throw new Error(
      "Não autorizado"
    );
  }

  const user =
    verifyToken(token);

  if (
    !user ||
    user.role !== "ADMIN"
  ) {
    throw new Error(
      "Sem permissão"
    );
  }

  return prisma.users.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
}