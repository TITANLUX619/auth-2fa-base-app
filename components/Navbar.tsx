'use client'

import React from 'react'
import SignOutButton from './auth/SignOutButton'

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-3 my-1">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-start">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
              <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-end">
            <div className="flex-shrink-0 flex items-center justify-center">
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar