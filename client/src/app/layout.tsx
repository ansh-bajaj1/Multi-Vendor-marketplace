import type { Metadata } from "next";
import "./globals.css";
import RootLayoutWrapper from "./layout.wrapper";

export const metadata: Metadata = {
  title: "Mini Multi-Vendor Marketplace",
  description: "A modern marketplace connecting vendors and customers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
