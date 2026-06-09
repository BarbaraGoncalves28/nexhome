export function PropertyFilters() {
  return (
    <form
      className="mb-8 grid gap-4 rounded-xl border p-4 md:grid-cols-5"
    >
      <input
        name="city"
        placeholder="Cidade"
        className="rounded border p-2"
      />

      <input
        name="district"
        placeholder="Bairro"
        className="rounded border p-2"
      />

      <select
        name="propertyType"
        className="rounded border p-2"
      >
        <option value="">
          Todos
        </option>

        <option value="HOUSE">
          Casa
        </option>

        <option value="APARTMENT">
          Apartamento
        </option>

        <option value="LAND">
          Terreno
        </option>

        <option value="COMMERCIAL">
          Comercial
        </option>
      </select>

      <input
        type="number"
        name="minPrice"
        placeholder="Preço mínimo"
        className="rounded border p-2"
      />

      <input
        type="number"
        name="maxPrice"
        placeholder="Preço máximo"
        className="rounded border p-2"
      />

      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Filtrar
      </button>
    </form>
  );
}