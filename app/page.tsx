import Home from "@/components/Home";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet Street Lens",
  description: "Wallet Street Lens, stock",
};

type Props = {};

const App = ({}: Props) => {
  return <Home />;
};

export default App;
