import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth'
import '../globals.css'
import Navbar from '@/components/Navbar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700">
        <div className='flex max-h-screen w-full flex-col gap-8 bg-gray-25'>
          <Navbar />
        </div>
        <div className='flex h-full justify-center items-center flex-col gap-8 bg-gray-25'>
          {children}
        </div>
      </main>
    </SessionProvider >
  );
}
