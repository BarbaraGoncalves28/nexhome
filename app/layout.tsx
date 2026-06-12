import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NexHome | Plataforma imobiliária premium",
    template: "%s | NexHome",
  },
  description:
    "NexHome conecta imóveis, corretores, leads e visitas em uma experiência SaaS imobiliária profissional.",
  openGraph: {
    title: "NexHome",
    description:
      "Plataforma imobiliária premium para gestão comercial, catálogo e CRM.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-950">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
