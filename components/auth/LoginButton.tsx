'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
  const router = useRouter()

  const onClick = () => {
    if (mode === 'redirect') {
      console.log('Redirecting to sign in page');
      router.push('/sign-in');
    } else {
      console.log('Opening sign in modal');
    }
  }

  return (
    <span onClick={onClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButton