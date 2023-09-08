import { AppWrapper } from "@/components/AppWrapper";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall Street Lens",
  description: "Wall street lens, stock",
};

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={nunito.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
