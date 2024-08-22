'use client'

import { useEffect } from 'react'
import { useToast } from "@/components/ui/use-toast"
import "../app/globals.css";

export function ToastHandler() {
  const { toast } = useToast()

  useEffect(() => {
    const checkForToast = () => {
      const toastData = document.cookie.split('; ').find(row => row.startsWith('toast='))
      if (toastData) {
        const toastValue = decodeURIComponent(toastData.split('=')[1])
        const { title, description, type } = JSON.parse(toastValue)
        console.log('Toast:', title, description, type)
        toast({
          title: title,
          description: description,
          variant: type,
        })
        // Elimina la cookie después de mostrar el toast
        document.cookie = 'toast=; max-age=0; path=/;'
      }
    }

    checkForToast()

    const interval = setInterval(checkForToast, 1000)

    return () => clearInterval(interval)
  }, [toast])

  return null
}