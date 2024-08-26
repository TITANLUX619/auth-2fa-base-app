import NewPasswordForm from '@/components/auth/NewPasswordForm'
import React, { Suspense } from 'react'

const ResetPage = () => {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  )
}

export default ResetPage