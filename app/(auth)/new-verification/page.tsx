import VerificationCard from '@/components/auth/VerifyEmailCard';
import React, { Suspense } from 'react'

const NewVerificationPage = () => {
  return (
    <Suspense>
      <VerificationCard />
    </Suspense>
  )
}

export default NewVerificationPage