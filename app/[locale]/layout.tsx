import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from '@/components/ui/sonner'
import DarkModeButton from "@/components/DarkModeButton";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Poppins({ subsets: ["latin"], weight: ['600'] });

export const metadata: Metadata = {
  title: "AuthV5",
  description: "Base auth app using Next Auth v5 y 2FA",
  icons: {
    icon: '/icons/logo.svg'
  }
};

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const locales = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={locales}>
          {children}
        </NextIntlClientProvider>
        <DarkModeButton />
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
