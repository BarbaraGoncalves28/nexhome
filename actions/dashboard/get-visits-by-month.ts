"use server";

import { prisma } from "@/lib/prisma";

export async function getVisitsByMonth() {
  const visits =
    await prisma.visits.findMany({
      select: {
        visit_date: true,
      },
    });

  const grouped =
    visits.reduce(
      (acc, visit) => {
        const month =
          visit.visit_date.toLocaleDateString(
            "pt-BR",
            {
              month:
                "short",
            }
          );

        acc[month] =
          (acc[month] || 0) + 1;

        return acc;
      },
      {} as Record<
        string,
        number
      >
    );

  return Object.entries(
    grouped
  ).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
}