import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { Suspense } from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main className="main-layout">
        <div className='flex w-full flex-col gap-4'>
          <Suspense>
            <Navbar />
          </Suspense>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-4 bg-gray-25 max-w-4xl'>
          {children}
        </div>
      </main>
    </SessionProvider>
  );
}
