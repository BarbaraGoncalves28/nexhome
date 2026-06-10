"use client";

import { createLead } from "@/actions/lead/create-lead";

type Props = {
  propertyId: string;
};

export function CreateLeadForm({
  propertyId,
}: Props) {
  async function handleSubmit(
    formData: FormData
  ) {
    await createLead(formData);
  }

  return (
    <form
      action={handleSubmit}
      className="space-y-4"
    >
      <input
        type="hidden"
        name="propertyId"
        value={propertyId}
      />

      <input
        name="name"
        placeholder="Nome"
        required
        className="w-full rounded border p-3"
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded border p-3"
      />

      <input
        name="phone"
        placeholder="Telefone"
        required
        className="w-full rounded border p-3"
      />

      <textarea
        name="message"
        placeholder="Mensagem"
        rows={4}
        className="w-full rounded border p-3"
      />

      <button
        className="rounded bg-green-600 px-5 py-3 text-white"
      >
        Tenho Interesse
      </button>
    </form>
  );
}
