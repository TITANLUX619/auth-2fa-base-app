import AuthHeader from '@/components/auth/AuthCardHeader';
import '../globals.css'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full  items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-700">
      {children}
    </div>
  );
}
