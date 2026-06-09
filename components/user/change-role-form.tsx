"use client";

import { useTransition } from "react";

import { updateUserRole } from "@/actions/user/update-user-role";

type Props = {
  userId: string;
  currentRole:
    | "ADMIN"
    | "REALTOR"
    | "CLIENT";
};

export function ChangeRoleForm({
  userId,
  currentRole,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  return (
    <select
      defaultValue={currentRole}
      disabled={pending}
      className="rounded border px-2 py-1"
      onChange={(event) => {
        const role =
          event.target.value as
            | "ADMIN"
            | "REALTOR"
            | "CLIENT";

        startTransition(
          async () => {
            await updateUserRole(
              userId,
              role
            );
          }
        );
      }}
    >
      <option value="ADMIN">
        ADMIN
      </option>

      <option value="REALTOR">
        REALTOR
      </option>

      <option value="CLIENT">
        CLIENT
      </option>
    </select>
  );
}