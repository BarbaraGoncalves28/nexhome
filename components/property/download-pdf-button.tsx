"use client";

import { generatePropertyPdf } from "@/actions/property/generate-property-pdf";

type Props = {
  propertyId: string;
};

export function DownloadPdfButton({
  propertyId,
}: Props) {
  async function handleDownload() {
    const pdfData =
      await generatePropertyPdf(
        propertyId
      );

    const blob =
      new Blob(
        [new Uint8Array(pdfData)],
        {
          type: "application/pdf",
        }
      );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement(
        "a"
      );

    a.href = url;

    a.download =
      "imovel.pdf";

    a.click();

    URL.revokeObjectURL(
      url
    );
  }

  return (
    <button
      onClick={
        handleDownload
      }
      className="rounded-lg bg-red-600 px-5 py-3 text-white"
    >
      Baixar PDF
    </button>
  );
}