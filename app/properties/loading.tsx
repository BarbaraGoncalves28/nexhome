export default function PropertiesLoading() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      <div className="h-44 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-lg bg-slate-200"
            />
          )
        )}
      </div>
    </main>
  );
}
