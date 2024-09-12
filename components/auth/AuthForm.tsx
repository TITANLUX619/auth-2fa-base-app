'use client';

import React, { useTransition } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { authFormSchema } from '@/schemas';
import { Loader2 } from 'lucide-react';
import { defaultAuthFormValues } from '@/lib/utils';
import AuthCardWrapper from './AuthCardWrapper';
import AuthInput from './AuthInput';
import { signIn, signUp } from '@/actions/auth-actions';
import useToast from '@/hooks/useToast';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  const [isPending, startTransition] = useTransition();
  const [show2FA, setShow2FA] = React.useState(false);
  const addToast = useToast();
  const t = useTranslations(); // Utiliza el namespace 'auth'

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultAuthFormValues,
  });

  async function onSubmit(formData: z.infer<typeof formSchema>) {
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
          password: formData.password,
        };

        startTransition(async () => {
          const result = await signUp(userData);

          addToast({ type: result?.type, message: result?.message });

          if (result.type === 'info') router.push('/sign-in');
        });
      }

      if (type === 'sign-in') {
        startTransition(async () => {
          const result = await signIn({
            email: formData.email,
            password: formData.password,
            twoFactorCode: formData['twoFactorCode'],
          });

          addToast({ type: result?.type, message: result?.message });

          if (result.data?.twoFactorEnabled) {
            setShow2FA(true);
          }

          if (result.type === 'success') router.push('/');
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const authButtonLabel = type === 'sign-up' ? t('auth.signup') : show2FA ? t('auth.sendCode') : t('auth.signin');

  return (
    <section className="auth-form">
      <AuthCardWrapper
        headerLabel={t('auth.welcome')}
        backbuttonLabel={type === 'sign-in' ? t('auth.dontHaveAccount') : t('auth.alreadyHaveAccount')}
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
                  label={t('auth.firstName')}
                  placeholder={t('auth.firstName')}
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-lastName'
                  control={form.control}
                  type='text'
                  name='lastName'
                  label={t('auth.lastName')}
                  placeholder={t('auth.lastName')}
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-address1'
                  control={form.control}
                  type='text'
                  name='address1'
                  label={t('auth.address')}
                  placeholder={t('auth.address')}
                  disabled={isPending}
                />
                <AuthInput
                  id='signin-city'
                  control={form.control}
                  type='text'
                  name='city'
                  label={t('auth.city')}
                  placeholder={t('auth.city')}
                  disabled={isPending}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-1/2">
                    <AuthInput
                      id='signin-postalCode'
                      control={form.control}
                      type='text'
                      name='postalCode'
                      label={t('auth.zip')}
                      placeholder={t('auth.zip')}
                      disabled={isPending}
                    />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <AuthInput
                      id='signin-dateOfBirth'
                      control={form.control}
                      type='date'
                      name='dateOfBirth'
                      label="Date of Birth"
                      disabled={isPending}
                    />
                  </div>
                </div>
              </>
            )}
            {show2FA ? (
              <AuthInput
                id='signin-2fa-code'
                control={form.control}
                type='text'
                name='twoFactorCode'
                label="2FA Code"
                placeholder='Enter code'
                disabled={isPending}
              />
            ) : (
              <>
                <AuthInput
                  id='signin-email'
                  control={form.control}
                  type='text'
                  name='email'
                  label={t('auth.email')}
                  placeholder={t('auth.emailPlaceHolder')}
                  disabled={isPending}
                />
                <div>
                  <AuthInput
                    id='signin-password'
                    control={form.control}
                    type='password'
                    name='password'
                    label={t('auth.password')}
                    placeholder={t('auth.password')}
                    disabled={isPending}
                  />
                  <Button
                    size='sm'
                    variant='link'
                    asChild
                  >
                    <Link href='/reset-password' onClick={() => console.log('Back')}>
                      {t('auth.forgotPassword')}
                    </Link>
                  </Button>
                </div>
              </>
            )}
            <div className="flex flex-col gap-4">
              <Button type="submit" onClick={() => onSubmit(form.getValues())} disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp;
                    {t('loading')}
                  </>
                ) : authButtonLabel}
              </Button>
            </div>
          </form>
        </Form>
      </AuthCardWrapper>
    </section>
  );
};

export default AuthForm;
