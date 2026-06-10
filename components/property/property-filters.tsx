import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

type Props = {
  defaultValues?: {
    city?: string;
    district?: string;
    propertyType?: string;
    minPrice?: string;
    maxPrice?: string;
  };
};

export function PropertyFilters({
  defaultValues,
}: Props) {
  return (
    <form className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2 xl:grid-cols-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 xl:col-span-5">
        <SlidersHorizontal className="h-4 w-4" />
        Filtros do portfólio
      </div>

      <input
        name="city"
        placeholder="Cidade"
        defaultValue={defaultValues?.city}
        className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
      />

      <input
        name="district"
        placeholder="Bairro"
        defaultValue={defaultValues?.district}
        className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
      />

      <select
        name="propertyType"
        defaultValue={
          defaultValues?.propertyType
        }
        className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
      >
        <option value="">Todos os tipos</option>
        <option value="HOUSE">Casa</option>
        <option value="APARTMENT">Apartamento</option>
        <option value="LAND">Terreno</option>
        <option value="COMMERCIAL">Comercial</option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Preço mínimo"
        defaultValue={
          defaultValues?.minPrice
        }
        className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Preço máximo"
        defaultValue={
          defaultValues?.maxPrice
        }
        className="rounded-lg border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-950"
      />

      <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 md:col-span-2 xl:col-span-5">
        <Search className="h-4 w-4" />
        Aplicar filtros
      </button>
    </form>
  );
}
