import { createProperty } from "@/actions/property/create-property";

export default function CreatePropertyPage() {
  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Cadastrar Imóvel
        </h1>

        <p className="mt-2 text-gray-500">
          Adicione um novo imóvel ao sistema.
        </p>
      </div>

      <form
        action={createProperty}
        className="space-y-6 rounded-xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-2 block font-medium"
          >
            Título
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Casa de Alto Padrão em Goiânia"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-medium"
          >
            Descrição
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Descreva o imóvel..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="price"
              className="mb-2 block font-medium"
            >
              Preço
            </label>

            <input
              id="price"
              name="price"
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="850000"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="area"
              className="mb-2 block font-medium"
            >
              Área (m²)
            </label>

            <input
              id="area"
              name="area"
              type="number"
              required
              min="0"
              placeholder="250"
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="bedrooms"
              className="mb-2 block font-medium"
            >
              Quartos
            </label>

            <input
              id="bedrooms"
              name="bedrooms"
              type="number"
              required
              min="0"
              placeholder="3"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="mb-2 block font-medium"
            >
              Banheiros
            </label>

            <input
              id="bathrooms"
              name="bathrooms"
              type="number"
              required
              min="0"
              placeholder="2"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="garageSpots"
              className="mb-2 block font-medium"
            >
              Vagas de Garagem
            </label>

            <input
              id="garageSpots"
              name="garageSpots"
              type="number"
              required
              min="0"
              placeholder="2"
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="city"
              className="mb-2 block font-medium"
            >
              Cidade
            </label>

            <input
              id="city"
              name="city"
              type="text"
              required
              placeholder="Goiânia"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="district"
              className="mb-2 block font-medium"
            >
              Bairro
            </label>

            <input
              id="district"
              name="district"
              type="text"
              required
              placeholder="Setor Bueno"
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="propertyType"
              className="mb-2 block font-medium"
            >
              Tipo do Imóvel
            </label>

            <select
              id="propertyType"
              name="propertyType"
              required
              className="w-full rounded-lg border p-3"
            >
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
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="mb-2 block font-medium"
          >
            Endereço
          </label>

          <input
            id="address"
            name="address"
            type="text"
            required
            placeholder="Rua Exemplo, nº 123"
            className="w-full rounded-lg border p-3"
          />

          <input
  name="latitude"
  placeholder="Latitude"
  type="number"
  step="any"
/>

<input
  name="longitude"
  placeholder="Longitude"
  type="number"
  step="any"
/>
        </div>

        <div>
          <label
            htmlFor="images"
            className="mb-2 block font-medium"
          >
            Imagens do Imóvel
          </label>

          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-2 text-sm text-gray-500">
            Você pode selecionar várias imagens.
          </p>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Salvar Imóvel
        </button>
      </form>
    </main>
  );
}