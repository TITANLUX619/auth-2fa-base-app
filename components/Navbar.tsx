'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import UserMenuButton from './auth/UserMenu'

const Navbar = () => {
  const router = useRouter()

  return (
    <nav className="bg-gray-800">
      <div className="ml-3 mr-4 my-1">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div
              onClick={() => { router.push('/') }}
              className="flex-shrink-0 flex items-center justify-center text-white text-3xl cursor-pointer"
            >
              🔑 Auth
            </div>
            <div className="flex-1 flex items-center justify-end">
              <UserMenuButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar