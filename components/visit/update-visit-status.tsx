"use client";

import { updateVisitStatus } from "@/actions/visit/update-visit-status";

type Props = {
  visitId: string;
};

export function UpdateVisitStatus({
  visitId,
}: Props) {
  async function handleChange(
    status: string
  ) {
    await updateVisitStatus(
      visitId,
      status as any
    );

    window.location.reload();
  }

  return (
    <select
      onChange={(e) =>
        handleChange(
          e.target.value
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