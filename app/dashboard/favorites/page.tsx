import { getMyFavorites } from "@/actions/favorite/get-my-favorites";

export default async function FavoritesPage() {
  const favorites =
    await getMyFavorites();

  return (
    <main className="p-8">
      <h1 className="mb-8 text-3xl font-bold">
        Meus Favoritos
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map(
          (favorite) => (
            <div
              key={favorite.id}
              className="overflow-hidden rounded-xl border"
            >
              <img
                src={
                  favorite
                    .property
                    .images[0]
                    ?.imageUrl
                }
                alt={
                  favorite
                    .property
                    .title
                }
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h2 className="font-semibold">
                  {
                    favorite
                      .property
                      .title
                  }
                </h2>

                <p className="text-sm text-gray-500">
                  {
                    favorite
                      .property
                      .city
                  }
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </main>
  );
}