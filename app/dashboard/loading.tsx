export default function DashboardLoading() {
  return (
    <main className="space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="h-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-lg bg-slate-200"
            />
          )
        )}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-96 animate-pulse rounded-lg bg-slate-200" />
        <div className="h-96 animate-pulse rounded-lg bg-slate-200" />
      </div>
    </main>
  );
}
