import { AppWrapper } from "@/components/AppWrapper";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wall Street Lens",
  description:
    "Web site is stock website. Web site created using create-react-app",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  keywords: "Wall Street Lens, stock",
  icons: "/Logo.png",
  manifest: "/manifest.json",
};

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
