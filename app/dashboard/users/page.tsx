import { getUsers } from "@/actions/user/get-users";

import { ChangeRoleForm } from "@/components/user/change-role-form";
import { DeleteUserButton } from "@/components/user/delete-user-button";

export default async function UsersPage() {
  const users =
    await getUsers();

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Usuários
      </h1>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Nome
              </th>

              <th className="p-4 text-left">
                E-mail
              </th>

              <th className="p-4 text-left">
                Cargo
              </th>

              <th className="p-4 text-left">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map(
              (user) => (
                <tr
                  key={user.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {user.name}
                  </td>

                  <td className="p-4">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <ChangeRoleForm
                      userId={
                        user.id
                      }
                      currentRole={
                        user.role
                      }
                    />
                  </td>

                  <td className="p-4">
                    <DeleteUserButton
                      userId={
                        user.id
                      }
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}