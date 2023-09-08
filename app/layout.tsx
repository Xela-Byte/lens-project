"use client";

import { fetchGlobalData } from "@/stateManagement/actions/fetchGlobalData";
import { Providers } from "@/stateManagement/provider";
import { AppDispatch, persistor, store } from "@/stateManagement/store";
import { Nunito_Sans } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PersistGate } from "redux-persist/integration/react";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch(fetchGlobalData());
  }, [store.dispatch]);

  return (
    <html>
      <body className={nunito.className}>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            {children}
            <Footer />
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}
