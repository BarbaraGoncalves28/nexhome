import Link from "next/link";
import Image from "next/image";
import {
  Bath,
  BedDouble,
  Building2,
  Car,
  Heart,
  MapPin,
  Share2,
} from "lucide-react";
import type { PropertyType } from "@prisma/client";

import {
  formatCurrency,
  propertyTypeLabels,
} from "@/lib/formatters";

type PropertyCardData = {
  id: string;
  title: string;
  price: unknown;
  area: number;
  bedrooms: number;
  bathrooms: number;
  garage_spots: number;
  city: string;
  district: string;
  property_type: PropertyType;
  property_images: {
    image_url: string; 
  }[];
  users?: {
    name: string;
  };
  _count?: {
    favorites?: number;
    visits?: number;
    leads?: number;
  };
};

type Props = {
  property: PropertyCardData;
  href: string;
  manageActions?: React.ReactNode;
};

export function PropertyCard({
  property,
  href,
  manageActions,
}: Props) {
  const image =
  property.property_images[0]?.image_url;

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      <Link
        href={href}
        className="block"
      >
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          {image ? (
            <Image
              src={image}
              alt={property.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)] text-slate-400">
              <Building2 className="h-12 w-12" />
            </div>
          )}

          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
            {propertyTypeLabels[property.property_type]}
          </div>

          <div className="absolute right-3 top-3 flex gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-700 shadow-sm">
              <Heart className="h-4 w-4" />
            </span>

            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/95 text-slate-700 shadow-sm">
              <Share2 className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {property.city} / {property.district}
            </p>

            <h3 className="mt-2 line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-slate-950">
              {property.title}
            </h3>
          </div>

          <p className="text-2xl font-bold text-emerald-700">
            {formatCurrency(Number(property.price))}
          </p>

          <div className="grid grid-cols-4 gap-2 border-y border-slate-100 py-3 text-sm text-slate-600">
            <span>{property.area}m²</span>

            <span className="flex items-center gap-1">
              <BedDouble className="h-4 w-4" />
              {property.bedrooms}
            </span>

            <span className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              {property.bathrooms}
            </span>

            <span className="flex items-center gap-1">
              <Car className="h-4 w-4" />
              {property.garage_spots}
            </span>
          </div>

          {property.users ? (
            <p className="text-sm text-slate-500">
              Corretor:{" "}
              <span className="font-medium text-slate-700">
                {property.users.name}
              </span>
            </p>
          ) : null}
        </div>
      </Link>

      {manageActions ? (
        <div className="flex gap-2 border-t border-slate-100 p-4">
          {manageActions}
        </div>
      ) : null}
    </article>
  );
}
