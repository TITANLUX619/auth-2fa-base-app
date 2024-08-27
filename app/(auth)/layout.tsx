import AuthHeader from '@/components/auth/AuthCardHeader';
import '../globals.css'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="main-layout">
      <div className='flex w-full flex-col items-center justify-center gap-4 bg-gray-25 max-w-4xl'>
        {children}
      </div>
    </main>
  );
}
