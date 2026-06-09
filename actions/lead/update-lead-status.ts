"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "VISIT_SCHEDULED"
  | "PROPOSAL_SENT"
  | "CLOSED";

export async function updateLeadStatus(
  leadId: string,
  status: LeadStatus
) {
  await prisma.lead.update({
    where: {
      id: leadId,
    },

    data: {
      status,
    },
  });

  revalidatePath(
    "/dashboard/leads"
  );

  return {
    success: true,
  };
}