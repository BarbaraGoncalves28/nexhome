"use server";

import type { VisitStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function updateVisitStatus(
  visitId: string,
  status: VisitStatus
) {
  await prisma.visit.update({
    where: {
      id: visitId,
    },

    data: {
      status,
    },
  });

  revalidatePath(
    "/dashboard/visits"
  );

  return {
    success: true,
  };
}
