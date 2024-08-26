import VerifyEmailComponent from '@/components/auth/VerifyEmailComponent';
import React, { Suspense } from 'react'

const NewVerificationPage = () => {
  return (
    <Suspense>
      <VerifyEmailComponent />
    </Suspense>
  )
}

export default NewVerificationPage