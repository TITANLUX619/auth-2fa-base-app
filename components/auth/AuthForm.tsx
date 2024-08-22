'use client'

import React, { startTransition, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { authFormSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import { defaultAuthFormValues } from '@/lib/utils';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInput from './AuthInput';
import { signIn, signUp } from '@/actions/auth-actions';



const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultAuthFormValues,
  })

  async function onSubmit(formData: z.infer<typeof formSchema>) {
    console.log('form data', formData);

    try {

      if (type === 'sign-up') {
        const userData = {
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          address1: formData.address1!,
          city: formData.city!,
          postalCode: formData.postalCode!,
          dateOfBirth: formData.dateOfBirth!,
          email: formData.email,
          password: formData.password
        }

        startTransition(() => {
          signUp(userData)
        })



      }

      if (type === 'sign-in') {
        startTransition(() => {
          signIn({
            email: formData.email,
            password: formData.password
          })
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <AuthCardWrapper
        headerLabel='Welcome back'
        backbuttonLabel={type === 'sign-in' ? 'Don’t have an account? Sign up' : 'Already have an account? Sign in'}
        backButtonHref={type === 'sign-in' ? '/sign-up' : '/sign-in'}
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {type === 'sign-up' && (
              <>
                <AuthInput
                  id='signin-firstName'
                  control={form.control}
                  type='text'
                  name='firstName'
                  label="First Name"
                  placeholder='Enter your first name'
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-lastName'
                  control={form.control}
                  type='text'
                  name='lastName'
                  label="Last Name"
                  placeholder='Enter your first name'
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-address1'
                  control={form.control}
                  type='text'
                  name='address1'
                  label="Address"
                  placeholder='Enter your specific address'
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-city'
                  control={form.control}
                  type='text'
                  name='city'
                  label="City"
                  placeholder='Enter your city'
                  disabled={isPending}
                />
                <div className="flex gap-4">
                  <AuthInput
                    id='signin-postalCode'
                    control={form.control}
                    type='text'
                    name='postalCode'
                    label="Postal Code"
                    placeholder='Enter your specific Postal Code'
                    disabled={isPending}
                  />
                  <AuthInput
                    id='signin-dateOfBirth'
                    control={form.control}
                    type='date'
                    name='dateOfBirth'
                    label="Date of Birth"
                    disabled={isPending}
                  />
                </div>
              </>
            )}

            <AuthInput
              id='signin-email'
              control={form.control}
              type='text'
              name='email'
              label="Email"
              placeholder='Enter your email'
              disabled={isPending}
            />
            <AuthInput
              id='signin-password'
              control={form.control}
              type='password'
              name='password'
              label="Password"
              placeholder='Enter your password'
              disabled={isPending}
            />

            <div className="flex flex-col gap-4">
              <Button type="submit" onClick={() => onSubmit(form.getValues())} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    Loading...
                  </>
                ) : type === 'sign-in'
                  ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </Form>
      </AuthCardWrapper>
    </div>
  )
}

export default AuthForm
