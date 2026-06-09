"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function getDashboardMetrics() {
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

  if (!user) {
    throw new Error(
      "Sessão inválida"
    );
  }

  // ADMIN
  if (
    user.role === "ADMIN"
  ) {
const [
  totalProperties,
  totalUsers,
  totalVisits,
  totalFavorites,
  totalLeads,
] = await Promise.all([
  prisma.property.count(),
  prisma.user.count(),
  prisma.visit.count(),
  prisma.favorite.count(),
  prisma.lead.count(),
]);

return {
  totalProperties,
  totalUsers,
  totalVisits,
  totalFavorites,
  totalLeads,
};
  }

  // CLIENT não deveria acessar dashboard
  if (
    user.role === "CLIENT"
  ) {
    throw new Error(
      "Sem permissão"
    );
  }

  // REALTOR

  const [
    totalProperties,
    totalVisits,
    totalFavorites,
  ] = await Promise.all([
    prisma.property.count({
      where: {
        ownerId:
          user.userId,
      },
    }),

    prisma.visit.count({
      where: {
        property: {
          ownerId:
            user.userId,
        },
      },
    }),

    prisma.favorite.count({
      where: {
        property: {
          ownerId:
            user.userId,
        },
      },
    }),
  ]);

  return {
    totalProperties,

    totalUsers: 0,

    totalVisits,

    totalFavorites,
  };
}