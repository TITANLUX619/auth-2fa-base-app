'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useSession } from '@/hooks/useSession'
import { FaUser } from 'react-icons/fa'
import SignOutButton from './SignOutButton'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const UserMenuButton = () => {
  const { session } = useSession()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user.image || ''} />
          <AvatarFallback>
            <FaUser className='text-white' />
            {session?.user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className='w-full font-normal'
            size='sm'
            onClick={() => { router.push('/user-menu') }}
          >
            <p>
              User Menu
            </p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserMenuButton