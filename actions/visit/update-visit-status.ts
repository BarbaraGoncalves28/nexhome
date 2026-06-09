"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

type VisitStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED";

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
}"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

type VisitStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED";

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