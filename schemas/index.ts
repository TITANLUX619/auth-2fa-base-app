import { z } from "zod";
import { UserRole } from "@prisma/client";

export const authFormSchema = (type: 'sign-in' | 'sign-up' | '2fa') =>
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
    // 2FA
    twoFactorCode: type === '2fa' ? z.string() : z.string().optional(),
  });

export const resetPasswordFormSchema =
  z.object({
    email: z.string().email(),
  });

export const newPasswordFormSchema =
  z.object({
    newPassword: z.string().min(8),
  });

export const settingsSchema = z.object({
  name: z.optional(z.string()),
  twoFactorEnabled: z.optional(z.boolean()),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  email: z.optional(z.string().email()),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false;
    }

    return true;
  }, {
    message: "New password is required!",
    path: ["newPassword"]
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  })
