import { notFound } from "next/navigation";

import { getProperty } from "@/actions/property/get-property";
import EditPropertyForm from "./property-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage(
  props: Props
) {
  const { id } =
    await props.params;

  const property =
    await getProperty(id);

  if (!property) {
    notFound();
  }

  return (
    <EditPropertyForm
      property={property}
    />
  );
}