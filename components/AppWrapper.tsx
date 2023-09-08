"use client";

import { Providers } from "@/stateManagement/provider";
import { persistor, store } from "@/stateManagement/store";
import { ReactNode, useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchGlobalData } from "@/stateManagement/actions/fetchGlobalData";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    store.dispatch<any>(fetchGlobalData());
  }, [store.dispatch]);
  return (
    <Providers>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        {children}
        <Footer />
      </PersistGate>
    </Providers>
  );
};
