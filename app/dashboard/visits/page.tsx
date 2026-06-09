import { getVisits } from "@/actions/visit/get-visits";

import { UpdateVisitStatus } from "@/components/visit/update-visit-status";

export default async function VisitsPage() {
  const visits =
    await getVisits();

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Visitas
      </h1>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">
                Cliente
              </th>

              <th className="p-4 text-left">
                Imóvel
              </th>

              <th className="p-4 text-left">
                Data
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {visits.map(
              (visit) => (
                <tr
                  key={visit.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      visit.user
                        .name
                    }
                  </td>

                  <td className="p-4">
                    {
                      visit
                        .property
                        .title
                    }
                  </td>

                  <td className="p-4">
                    {new Date(
                      visit.visitDate
                    ).toLocaleString(
                      "pt-BR"
                    )}
                  </td>

                  <td className="p-4">
                    {
                      visit.status
                    }
                  </td>

                  <td className="p-4">
                    <UpdateVisitStatus
                      visitId={
                        visit.id
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