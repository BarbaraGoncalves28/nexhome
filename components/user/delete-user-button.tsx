"use client";

import { useTransition } from "react";

import { deleteUser } from "@/actions/user/delete-user";

type Props = {
  userId: string;
};

export function DeleteUserButton({
  userId,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <button
      disabled={pending}
      className="rounded bg-red-600 px-3 py-1 text-white"
      onClick={() => {
        const confirmed =
          window.confirm(
            "Deseja realmente excluir este usuário?"
          );

        if (!confirmed) {
          return;
        }

        startTransition(
          async () => {
            await deleteUser(
              userId
            );
          }
        );
      }}
    >
      Excluir
    </button>
  );
}