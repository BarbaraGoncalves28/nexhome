"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicStats() {
  const [
    properties,
    realtors,
    visits,
  ] = await Promise.all([
    prisma.property.count(),

    prisma.user.count({
      where: {
        role: "REALTOR",
      },
    }),

    prisma.visit.count(),
  ]);

  return {
    properties,
    realtors,
    visits,
  };
}