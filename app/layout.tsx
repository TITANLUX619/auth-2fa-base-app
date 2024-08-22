import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastHandler } from "@/components/ToastHandler";
import { Toaster } from "@/components/ui/toaster";

const inter = Poppins({ subsets: ["latin"], weight: ['600'] });

export const metadata: Metadata = {
  title: "AuthV5",
  description: "Base auth app using Next Auth v5 y 2FA",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <ToastHandler />
      </body>
    </html>
  );
}
