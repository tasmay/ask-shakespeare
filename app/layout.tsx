import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ask Shakespeare — Culinary Recipes in Verse",
  description: "Ask Shakespeare for any recipe and discover culinary instructions translated into Shakespearean poems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.className} bg-parchment-50 text-plum-950 min-h-screen selection:bg-honey-400 selection:text-plum-950`}>
        {children}
      </body>
    </html>
  );
}
