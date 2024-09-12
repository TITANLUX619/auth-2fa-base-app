'use client'

import React from 'react'
import UserMenuButton from './auth/UserMenu'
import { useRouter } from '@/i18n/routing'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="bg-foreground/50 w-full z-50">
      <div className="w-full max-w-full px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => { router.push('/') }}
            className="text-white text-3xl cursor-pointer"
          >
            🔑 Auth
          </div>
          <div className="flex items-center">
            <UserMenuButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
