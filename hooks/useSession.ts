import { useSession as useAuthSession } from 'next-auth/react'

export const useSession = () => {
  const { data: session, status } = useAuthSession()

  return { session, status }
}