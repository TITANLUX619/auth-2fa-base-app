'use client';

import { verifyToken } from '@/actions/verification-token-actions';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper'
import useToast from '@/hooks/useToast';
import { useSearchParams } from 'next/navigation';
import React, { memo, useEffect } from 'react'
import { BeatLoader } from 'react-spinners'
import { toast } from 'sonner';

function VerificationCard() {
  const searchParams = useSearchParams()
  const verificationToken = searchParams.get('token')

  const onSubmit = async () => {
    if (verificationToken) {
      const result = await verifyToken(verificationToken)

      if (result && 'error' in result) toast.error(result.error)

      if (result && 'type' in result && 'message' in result)
        useToast({ type: result?.type, message: result?.message })
    }
  }

  useEffect(() => {
    onSubmit()

    return () => {
      console.log('unmounting');

    }
  }), []

  return (
    <AuthCardWrapper
      headerLabel="Confirming your verification"
      backbuttonLabel='Back to sign in'
      backButtonHref='/sign-in'
    >
      <div className="flex w-full items-center justify-center">
        <BeatLoader />
      </div>
    </AuthCardWrapper>
  )
}

export default VerificationCard
