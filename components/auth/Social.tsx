'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { Button } from '../ui/button'

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        className="w-full"
        onClick={() => console.log('Google')}
        variant="outline"
      >
        <FcGoogle className="text-xl" />
      </Button>
      <Button
        className="w-full"
        onClick={() => console.log('Github')}
        variant="outline"
      >
        <FaGithub className="text-xl" />
      </Button>
    </div>
  )
}

export default Social