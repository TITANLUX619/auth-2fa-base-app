import { auth, signOut } from '@/auth/auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();

  return (
    <div className='space-y-8 text-center'>
      <h1 className='text-6xl font-bold text-white drop-shadow-md'>
        🔑 Auth
      </h1>
      <p className='text-2xl text-white'>
        Scaffolding app using Next Auth v5 and 2FA
      </p>
      <div>
        <p className='text-white text-lg'>
          {JSON.stringify(session?.user)}
        </p>
      </div>
      <form
        action={async () => {
          'use server'
          await signOut({ redirectTo: '/sign-in', redirect: true })
        }}
      >
        <button className=" relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none transition-colors hover:bg-red-500 hover:text-white focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Sign Out
        </button>
      </form>

    </div>
  );
}
