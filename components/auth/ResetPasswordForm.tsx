'use client'

import React, { useTransition } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { resetPasswordFormSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInput from './AuthInput';
import { resetPassword } from '@/actions/auth-actions';
import useToast from '@/hooks/useToast'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const ResetPasswordForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const addToast = useToast();
  const t = useTranslations();

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(formData: z.infer<typeof resetPasswordFormSchema>) {
    try {
      startTransition(async () => {
        const result = await resetPassword({
          email: formData.email,
        })

        addToast({ type: result?.type, message: result?.message })

        if (result.type === 'success') router.push('/')

      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="auth-form">
      <AuthCardWrapper
        headerLabel={t('auth.resetYourPassword')}
        backbuttonLabel={t('auth.backToSignin')}
        backButtonHref='/sign-in'
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AuthInput
              id='reset-password-email'
              control={form.control}
              type='text'
              name='email'
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceHolder')}
              disabled={isPending}
            />
            <div className="flex flex-col gap-4">
              <Button type="submit" onClick={() => onSubmit(form.getValues())} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    {t('loading')}
                  </>
                ) : t('auth.sendResetEmail')}
              </Button>
            </div>
          </form>
        </Form>
      </AuthCardWrapper>
    </section>
  )
}

export default ResetPasswordForm
