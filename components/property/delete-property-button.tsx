"use client";

import { useState } from "react";

import { deleteProperty } from "@/actions/property/delete-property";

type Props = {
  propertyId: string;
};

export function DeletePropertyButton({
  propertyId,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Deseja realmente excluir este imóvel?"
      );

    if (!confirmed) return;

    setLoading(true);

    const result =
      await deleteProperty(
        propertyId
      );

    setLoading(false);

    alert(result.message);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700 disabled:opacity-50"
    >
      {loading
        ? "Excluindo..."
        : "Excluir"}
    </button>
  );
}