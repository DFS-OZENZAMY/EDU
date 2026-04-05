import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDU - Logiciel de gestion scolaire au Maroc",
  description: "La solution complète pour la gestion de votre école au Maroc. Inscriptions, notes, absences, paiements et communication.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
