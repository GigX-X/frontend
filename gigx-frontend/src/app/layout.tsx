import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Atkinson_Hyperlegible as FontAtkinson } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontAtkinson = FontAtkinson({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontAtkinson.variable
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
