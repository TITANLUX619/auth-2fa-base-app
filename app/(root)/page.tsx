import { auth, signOut } from '@/auth/auth';
import SignOutButton from '@/components/auth/SignOutButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='space-y-8 text-center'>
      <h1 className='text-6xl font-bold text-white drop-shadow-md'>
        🔑 Auth
      </h1>
      <p className='text-2xl text-white'>
        Scaffolding app using Next Auth v5 and 2FA
      </p>
      <div className='flex flex-row gap-4'>
        <Button
          className='w-full font-normal'
          size='sm'
          asChild
        >
          <Link href='/user-menu'>
            User Menu
          </Link>
        </Button>
      </div>
    </div>
  );
}
