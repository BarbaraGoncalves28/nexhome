"use server";

import { prisma } from "@/lib/prisma";

export async function getPublicStats() {
  const [
    properties,
    realtors,
    visits,
  ] = await Promise.all([
    prisma.properties.count(),

    prisma.users.count({
      where: {
        role: "BROKER",
      },
    }),

    prisma.visits.count(),
  ]);

  return {
    properties,
    realtors,
    visits,
  };
}