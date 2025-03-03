"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

const MSWLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [qc] = useState(() => new QueryClient());

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
};

export default MSWLayout;
