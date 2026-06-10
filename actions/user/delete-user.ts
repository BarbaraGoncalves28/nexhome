"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function deleteUser(
  userId: string
) {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get("token")
      ?.value;

  const currentUser =
    token
      ? verifyToken(token)
      : null;

  if (
    !currentUser ||
    currentUser.role !==
      "ADMIN"
  ) {
    return {
      success: false,
      message:
        "Sem permissão",
    };
  }

  if (
  currentUser.userId === userId
) {
  return {
    success: false,
    message:
      "Você não pode excluir sua própria conta",
  };
}

  await prisma.users.delete({
    where: {
      id: userId,
    },
  });

  revalidatePath(
    "/dashboard/users"
  );

  return {
    success: true,
  };
}