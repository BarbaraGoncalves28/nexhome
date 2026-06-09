"use client";

import { updateLeadStatus } from "@/actions/lead/update-lead-status";

type Props = {
  leadId: string;
  currentStatus: string;
};

export function LeadStatusSelect({
  leadId,
  currentStatus,
}: Props) {
  return (
    <select
      defaultValue={
        currentStatus
      }
      onChange={async (e) => {
        await updateLeadStatus(
          leadId,
          e.target.value as never
        );
      }}
      className="rounded border p-2"
    >
      <option value="NEW">
        Novo
      </option>

      <option value="CONTACTED">
        Contatado
      </option>

      <option value="VISIT_SCHEDULED">
        Visita Agendada
      </option>

      <option value="PROPOSAL_SENT">
        Proposta Enviada
      </option>

      <option value="CLOSED">
        Fechado
      </option>
    </select>
  );
}