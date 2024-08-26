import { z } from "zod";

export const authFormSchema = (type: 'sign-in' | 'sign-up') =>
  z.object({
    // sign up
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: type === 'sign-in' ? z.string() : z.string().min(8),
    code: z.string().optional(),
  });

export const resetPasswordFormSchema =
  z.object({
    email: z.string().email(),
  });

export const newPasswordFormSchema =
  z.object({
    newPassword: z.string().min(8),
  });