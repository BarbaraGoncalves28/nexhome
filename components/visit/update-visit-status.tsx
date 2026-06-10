"use client";

import type { VisitStatus } from "@prisma/client";

import { updateVisitStatus } from "@/actions/visit/update-visit-status";

type Props = {
  visitId: string;
};

export function UpdateVisitStatus({
  visitId,
}: Props) {
  async function handleChange(
    status: VisitStatus
  ) {
    await updateVisitStatus(
      visitId,
      status
    );

    window.location.reload();
  }

  return (
    <select
      onChange={(e) =>
        handleChange(
          e.target.value as VisitStatus
        )
      }
      className="rounded border p-2"
    >
      <option value="PENDING">
        Pendente
      </option>

      <option value="CONFIRMED">
        Confirmada
      </option>

      <option value="COMPLETED">
        Concluída
      </option>

      <option value="CANCELED">
        Cancelada
      </option>
    </select>
  );
}
