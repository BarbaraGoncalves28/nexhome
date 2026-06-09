"use server";

import { prisma } from "@/lib/prisma";

export async function getFinancialMetrics() {
  const properties =
    await prisma.property.findMany({
      select: {
        price: true,
      },
    });

  const totalValue =
    properties.reduce(
      (acc, property) =>
        acc +
        Number(
          property.price
        ),
      0
    );

  const averagePrice =
    properties.length > 0
      ? totalValue /
        properties.length
      : 0;

  return {
    totalValue,
    averagePrice,
  };
}