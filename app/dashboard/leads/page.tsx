import { getLeads } from "@/actions/lead/get-leads";
import { LeadStatusSelect } from "@/components/lead/lead-status-select";

export default async function LeadsPage() {
  const leads =
    await getLeads();

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Leads
      </h1>

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">
                Nome
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Telefone
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
            </tr>
          </thead>

          <tbody>
            {leads.map(
              (lead) => (
                <tr
                  key={lead.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {lead.name}
                  </td>

                  <td className="p-4">
                    {lead.email}
                  </td>

                  <td className="p-4">
                    {lead.phone}
                  </td>

                  <td className="p-4">
                    {
                      lead.property
                        .title
                    }
                  </td>

                  <td className="p-4">
                    {new Date(
                      lead.createdAt
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>

                  <td className="p-4">
  <LeadStatusSelect
    leadId={lead.id}
    currentStatus={
      lead.status
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