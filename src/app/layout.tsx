import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/components/providers/music-provider";
import { AccessGate } from "@/components/access/access-gate";
import { siteConfig } from "@/config/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteConfig.couple.groom} & ${siteConfig.couple.bride}`,
  description: siteConfig.event.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <MusicProvider>
          <AccessGate>{children}</AccessGate>
        </MusicProvider>
      </body>
    </html>
  );
}
