"use server";

import { prisma } from "@/lib/prisma";

export async function getFinancialMetrics() {
  const metrics =
    await prisma.properties.aggregate({
      _sum: {
        price: true,
      },

      _avg: {
        price: true,
      },
    });

  return {
    totalValue: Number(
      metrics._sum.price ?? 0
    ),
    averagePrice: Number(
      metrics._avg.price ?? 0
    ),
  };
}
