'use client'

import SignOutButton from "@/components/auth/SignOutButton";
import { useSession } from "@/hooks/useSession";



export default function UserMenu() {
  const { session, status } = useSession();

  return (
    <div className='space-y-8 text-center'>
      <div>
        <p className='text-white text-lg'>
          {JSON.stringify(session?.user)}
        </p>
      </div>

      <div>
        <p className='text-white text-lg'>
          {status}
        </p>
      </div>
    </div>
  );
}
