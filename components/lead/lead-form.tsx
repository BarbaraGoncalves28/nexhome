"use client";

import { useState } from "react";

import { createLead } from "@/actions/lead/create-lead";

type Props = {
  propertyId: string;
};

export function LeadForm({
  propertyId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function handleSubmit(
    formData: FormData
  ) {
    setLoading(true);

    formData.set(
      "propertyId",
      propertyId
    );

    await createLead(formData);

    setSuccess(true);

    setLoading(false);
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6">
        Interesse enviado com sucesso.
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4 rounded-xl border p-6"
    >
      <h2 className="text-xl font-semibold">
        Tenho Interesse
      </h2>

      <input
        name="name"
        placeholder="Nome"
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        name="email"
        type="email"
        placeholder="E-mail"
        required
        className="w-full rounded-lg border p-3"
      />

      <input
        name="phone"
        placeholder="Telefone"
        required
        className="w-full rounded-lg border p-3"
      />

      <textarea
        name="message"
        rows={4}
        placeholder="Mensagem"
        className="w-full rounded-lg border p-3"
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        {loading
          ? "Enviando..."
          : "Enviar Interesse"}
      </button>
    </form>
  );
}
