'use server'

import { addServerToast } from "@/lib/serverToast";
import bcryptjs from 'bcryptjs';
import { signIn as authSignIn, signOut as authSignOut } from '@/auth/auth';
import { DEFAULT_SIGN_IN_REDIRECT, DEFAULT_SIGN_OUT_REDIRECT, DEFAULT_SIGN_UP_REDIRECT } from "@/lib/constants/routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export const signIn = async ({ email, password }: AuthSignInProps) => {
  let redirectUrl;

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirect: false,
    });

    redirectUrl = DEFAULT_SIGN_IN_REDIRECT;

    addServerToast(
      {
        description: 'User logged in successfully',
        type: 'success'
      }
    );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          addServerToast(
            {
              description: 'Invalid credentials',
              type: 'error'
            }
          );
          break;
        default:
          console.log(error);
          addServerToast(
            {
              description: 'Something wrong happened with the Sign In',
              type: 'error'
            }
          );
          break;
      }
    }
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export const signOut = async () => {
  await authSignOut({ redirect: false });
  redirect(DEFAULT_SIGN_OUT_REDIRECT);
}

export const signUp = async (formData: AuthSignUpParams) => {
  let redirectUrl;

  try {
    // insert a prisma database user
    const hasshedPassword = await bcryptjs.hash(formData.password, 10);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: formData.email
      }
    });

    if (existingUser) {
      addServerToast(
        {
          description: 'User already exists',
          type: 'error'
        }
      );
      return;
    }

    await prisma.user.create({
      data: {
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        city: formData.city,
        postalCode: formData.postalCode,
        dateOfBirth: new Date(formData.dateOfBirth),
        email: formData.email,
        password: hasshedPassword
      }
    })

    addServerToast(
      {
        description: 'User registered successfully',
        type: 'success'
      }
    );
    redirectUrl = DEFAULT_SIGN_UP_REDIRECT;

  } catch (error) {
    console.log(error);
    addServerToast(
      {
        description: 'Something wrong happened with the Sign Up',
        type: 'error'
      }
    );
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;

  } catch (error) {
    addServerToast(
      {
        description: 'User not found.',
        type: 'error'
      }
    )
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;

  } catch (error) {
    addServerToast(
      {
        description: 'User not found.',
        type: 'error'
      }
    )
  }
}