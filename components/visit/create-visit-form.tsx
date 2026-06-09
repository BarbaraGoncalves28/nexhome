"use client";

import { useState } from "react";

import { createVisit } from "@/actions/visit/create-visit";

type Props = {
  propertyId: string;
};

export function CreateVisitForm({
  propertyId,
}: Props) {
  const [visitDate, setVisitDate] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setLoading(true);

    const result =
      await createVisit(
        propertyId,
        new Date(visitDate),
        notes
      );

    setLoading(false);

    if (result.success) {
      alert(
        "Visita agendada com sucesso!"
      );

      setVisitDate("");
      setNotes("");
    } else {
      alert(result.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="mb-2 block font-medium">
          Data da Visita
        </label>

        <input
          type="datetime-local"
          required
          value={visitDate}
          onChange={(e) =>
            setVisitDate(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Observações
        </label>

        <textarea
          value={notes}
          onChange={(e) =>
            setNotes(
              e.target.value
            )
          }
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        {loading
          ? "Agendando..."
          : "Agendar Visita"}
      </button>
    </form>
  );
}