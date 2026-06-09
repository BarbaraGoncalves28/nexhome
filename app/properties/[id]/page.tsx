import { notFound } from "next/navigation";

import { getPropertyById } from "@/actions/property/get-property-by-id";
import { CreateVisitForm } from "@/components/visit/create-visit-form";
import { CreateLeadForm } from "@/components/lead/create-lead-form";
import dynamic from "next/dynamic";
import { DownloadPdfButton } from "@/components/property/download-pdf-button";

const PropertyMap =
  dynamic(
    () =>
      import(
        "@/components/property/property-map"
      ).then(
        (mod) =>
          mod.PropertyMap
      ),
    {
      ssr: false,
    }
  );

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyDetailsPage(
  props: Props
) {
  const { id } =
    await props.params;

  const property =
    await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        {property.title}
      </h1>

      <p className="mb-8 text-gray-500">
        {property.city} •{" "}
        {property.district}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {property.images.map(
          (image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt={
                property.title
              }
              className="h-[400px] w-full rounded-xl object-cover"
            />
          )
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold text-green-600">
          {Number(
            property.price
          ).toLocaleString(
            "pt-BR",
            {
              style:
                "currency",
              currency:
                "BRL",
            }
          )}
        </h2>

        <div className="mt-6">
            <DownloadPdfButton
                propertyId={
                property.id
                }
            />
        </div>

        <p className="mt-6 text-lg leading-8">
          {
            property.description
          }
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {
  property.latitude &&
  property.longitude && (
    <section className="mt-10">
      <h3 className="mb-4 text-2xl font-semibold">
        Localização
      </h3>

      <PropertyMap
        latitude={Number(
          property.latitude
        )}
        longitude={Number(
          property.longitude
        )}
        title={
          property.title
        }
      />
    </section>
  );
}
        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Área
          </p>

          <p className="font-bold">
            {property.area}m²
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Quartos
          </p>

          <p className="font-bold">
            {
              property.bedrooms
            }
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Banheiros
          </p>

          <p className="font-bold">
            {
              property.bathrooms
            }
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-gray-500">
            Garagem
          </p>

          <p className="font-bold">
            {
              property.garageSpots
            }
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl border p-6">
        <h3 className="mb-4 text-xl font-semibold">
          Corretor responsável
        </h3>

        <p>
          {property.owner.name}
        </p>

        <p className="text-gray-500">
          {
            property.owner.email
          }
        </p>
      </div>

      <section className="mt-10 rounded-xl border p-6">
  <h3 className="mb-6 text-2xl font-semibold">
    Agendar Visita
  </h3>

  <CreateVisitForm
    propertyId={property.id}
  />
</section>

<section className="mt-10 rounded-xl border p-6">
  <h3 className="mb-6 text-2xl font-semibold">
    Tenho Interesse
  </h3>

  <CreateLeadForm
    propertyId={property.id}
  />
</section>
    </main>
  );
}