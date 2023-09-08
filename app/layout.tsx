"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { fetchGlobalData } from "@/stateManagement/actions/fetchGlobalData";
import { Providers } from "@/stateManagement/provider";
import {
  AppDispatch,
  AppThunkDispatch,
  persistor,
  store,
} from "@/stateManagement/store";
import { Nunito_Sans } from "next/font/google";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";
import { useDispatch } from "react-redux";
import Head from "next/head";

const nunito = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    store.dispatch<any>(fetchGlobalData());
  }, [store.dispatch]);

  return (
    <html>
      <Head>
        <title>Wallet Street Lens</title>
        <meta property="og:title" content="Wallet Street Lens" key="title" />
        <meta name="description" content="Wallet Lens Street, stock" />
      </Head>
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
