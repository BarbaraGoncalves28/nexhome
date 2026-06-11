import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  Car,
  MapPin,
  Ruler,
  UserRound,
} from "lucide-react";

import { getPropertyById } from "@/actions/property/get-property-by-id";
import { getRelatedProperties } from "@/actions/property/get-related-properties";
import { CreateLeadForm } from "@/components/lead/create-lead-form";
import { DownloadPdfButton } from "@/components/property/download-pdf-button";
import { PropertyCard } from "@/components/property/property-card";
import { CreateVisitForm } from "@/components/visit/create-visit-form";
import {
  formatCurrency,
  propertyTypeLabels,
} from "@/lib/formatters";

const PropertyMap = dynamic(
  () =>
    import(
      "@/components/property/property-map"
    ).then((mod) => mod.PropertyMap),
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
  const { id } = await props.params;

  const [property, relatedProperties] =
    await Promise.all([
      getPropertyById(id),
      getRelatedProperties(id),
    ]);

  if (!property) {
    notFound();
  }

  const mainImage =
  property.property_images[0]?.image_url;

const galleryImages =
  property.property_images.slice(1, 5);

  return (
    <main className="bg-slate-50">
      <section className="bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
            <MapPin className="h-4 w-4" />
            {property.city} / {property.district}
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                {property.title}
              </h1>

              <p className="mt-5 max-w-2xl text-slate-300">
                {property.address}
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/10 p-5">
              <p className="text-sm text-slate-300">
                Valor do imóvel
              </p>
              <p className="mt-2 text-3xl font-bold text-cyan-200">
                {formatCurrency(Number(property.price))}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {propertyTypeLabels[property.property_type as keyof typeof propertyTypeLabels]}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={property.title}
                className="h-105 w-full object-cover"
                width={1200} height={800}
              />
            ) : (
              <div className="grid h-105 place-items-center bg-slate-100 text-slate-400">
                <Building2 className="h-16 w-16" />
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {galleryImages.length > 0 ? (
              galleryImages.map((image) => (
                <Image
                  key={image.id}
                  src={image.image_url}
                  alt={property.title}
                  width={600} height={400}
                  className="h-49.5 w-full rounded-lg border border-slate-200 object-cover shadow-sm"
                />
              ))
            ) : (
              <div className="grid h-full min-h-52 place-items-center rounded-lg border border-dashed border-slate-300 bg-white text-sm text-slate-500">
                Galeria sem imagens adicionais
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Spec
              icon={<Ruler />}
              label="Área"
              value={`${property.area}m²`}
            />
            <Spec
              icon={<BedDouble />}
              label="Quartos"
              value={String(property.bedrooms)}
            />
            <Spec
              icon={<Bath />}
              label="Banheiros"
              value={String(property.bathrooms)}
            />
            <Spec
              icon={<Car />}
              label="Garagem"
              value={String(property.garage_spots)}
            />
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-950">
              Sobre o imóvel
            </h2>

            <p className="mt-4 leading-8 text-slate-600">
              {property.description}
            </p>

            <div className="mt-6">
              <DownloadPdfButton propertyId={property.id} />
            </div>
          </section>

          {property.latitude &&
          property.longitude ? (
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-slate-950">
                Localização
              </h2>

              <PropertyMap
                latitude={Number(
                  property.latitude
                )}
                longitude={Number(
                  property.longitude
                )}
                title={property.title}
              />
            </section>
          ) : null}

          {relatedProperties.length > 0 ? (
            <section>
              <h2 className="mb-5 text-2xl font-bold text-slate-950">
                Imóveis relacionados
              </h2>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {relatedProperties.map(
                  (relatedProperty) => (
                    <PropertyCard
                      key={relatedProperty.id}
                      property={relatedProperty}
                      href={`/properties/${relatedProperty.id}`}
                    />
                  )
                )}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-slate-950 text-white">
                <UserRound className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-950">
                  Corretor responsável
                </h2>
                <p className="text-sm text-slate-500">
                  Atendimento comercial
                </p>
              </div>
            </div>

            <div className="mt-5">
              <p className="font-medium text-slate-950">
                {property.users.name}
              </p>
              <p className="text-sm text-slate-500">
                {property.users.email}
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-950">
              <CalendarCheck className="h-5 w-5" />
              Agendar visita
            </h2>

            <CreateVisitForm propertyId={property.id} />
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Tenho interesse
            </h2>

            <CreateLeadForm propertyId={property.id} />
          </section>
        </aside>
      </section>
    </main>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
        {icon}
      </div>
      <p className="mt-4 text-sm text-slate-500">
        {label}
      </p>
      <p className="text-xl font-bold text-slate-950">
        {value}
      </p>
    </div>
  );
}
