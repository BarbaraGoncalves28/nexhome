export default function PropertyDetailsLoading() {
  return (
    <main className="bg-slate-50">
      <div className="h-80 animate-pulse bg-slate-900" />
      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="h-[420px] animate-pulse rounded-lg bg-slate-200" />
          <div className="h-[420px] animate-pulse rounded-lg bg-slate-200" />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-32 animate-pulse rounded-lg bg-slate-200"
                />
              )
            )}
          </div>
          <div className="h-80 animate-pulse rounded-lg bg-slate-200" />
        </div>
        <div className="h-[520px] animate-pulse rounded-lg bg-slate-200" />
      </section>
    </main>
  );
}
