import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConnectRPC Calculator",
  description: "A simple calculator using ConnectRPC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
