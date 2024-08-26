'use client'

import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <Button
      className='w-full font-normal'
      size='sm'
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton