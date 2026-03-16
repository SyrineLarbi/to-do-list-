import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-Do List",
  description: "Per-project reading tracker",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-950 text-gray-100">{children}</body>
    </html>
  );
}
