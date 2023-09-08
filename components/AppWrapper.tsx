"use client";

import { Providers } from "@/stateManagement/provider";
import { persistor, store } from "@/stateManagement/store";
import { ReactNode, useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchGlobalData } from "@/stateManagement/actions/fetchGlobalData";
import Script from "next/script";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch<any>(fetchGlobalData());
  }, [store.dispatch]);

  return (
    <Providers>
      <PersistGate loading={null} persistor={persistor}>
        <Script
          async
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-0J1NSHDGTG"
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag("js", new Date());

                gtag("config", "G-0J1NSHDGTG");
              `,
          }}></Script>
        <Navbar />
        {children}
        <Footer />
      </PersistGate>
    </Providers>
  );
};
