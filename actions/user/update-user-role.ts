"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

type UserRole =
  | "ADMIN"
  | "REALTOR"
  | "CLIENT";

export async function updateUserRole(
  userId: string,
  role: UserRole
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
  currentUser.userId === userId &&
  role !== "ADMIN"
) {
  return {
    success: false,
    message:
      "Você não pode alterar seu próprio cargo",
  };
}

  await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      role,
    },
  });

  revalidatePath(
    "/dashboard/users"
  );

  return {
    success: true,
  };
}