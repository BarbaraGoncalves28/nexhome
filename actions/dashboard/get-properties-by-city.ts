"use server";

import { prisma } from "@/lib/prisma";

export async function getPropertiesByCity() {
  const properties =
    await prisma.property.groupBy({
      by: ["city"],

      _count: {
        city: true,
      },
    });

  return properties.map(
    (property) => ({
      city: property.city,
      total:
        property._count.city,
    })
  );
}