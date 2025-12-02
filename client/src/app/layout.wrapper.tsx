"use client";

import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthContext";

export default function RootLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </AuthProvider>
    </ReactQueryProvider>
  );
}
