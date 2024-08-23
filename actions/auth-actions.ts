'use server'

import bcryptjs from 'bcryptjs';
import { signIn as authSignIn, signOut as authSignOut } from '@/auth/auth';
import { DEFAULT_SIGN_IN_REDIRECT, DEFAULT_SIGN_OUT_REDIRECT, DEFAULT_SIGN_UP_REDIRECT } from "@/lib/constants/routes";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { generateVerificationToken } from "./verification-token-actions";
import { Resend } from "resend";
import { ConfirmationEmailTemplate } from "@/components/auth/ConfirmationEmailTemplate";

export const signIn = async ({ email, password }: AuthSignInProps): ServerActionResult<null> => {
  let redirectUrl;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { type: 'error', message: 'Invalid credentials!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { type: 'info', message: 'Verification email sent!' };
  }

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirect: false,
    });

    redirectUrl = DEFAULT_SIGN_IN_REDIRECT;

    return { type: 'success', message: 'Signed in!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { type: 'error', message: 'Invalid credentials!' };
        default:
          console.log(error);
          return { type: 'error', message: 'Something went wrong, please try again!' };
      }
    }
  }
}

export const signOut = async () => {
  await authSignOut({ redirect: false });
  redirect(DEFAULT_SIGN_OUT_REDIRECT);
}

export const signUp = async (formData: AuthSignUpParams): ServerActionResult<null> => {
  let redirectUrl;

  try {
    // insert a prisma database user
    const hasshedPassword = await bcryptjs.hash(formData.password, 10);

    const existingUser = await getUserByEmail(formData.email);

    if (existingUser) {
      return { type: 'error', message: 'User already exists, please sign in!' };
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

    const verificationToken = await generateVerificationToken(formData.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { type: 'info', message: 'Verification email sent!' };
  } catch (error) {
    console.log(error);
    return { type: 'error', message: 'Something went wrong, please try again!' };

  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your email address',
      react: ConfirmationEmailTemplate({ confirmLink: confirmLink }),
    });
  } catch (error) {
    console.log(error);
  }
}



