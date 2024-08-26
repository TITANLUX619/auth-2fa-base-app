'use server';

import prisma from '@/lib/db';

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

export const updateUserImage = async (email: string, image: string) => {
  const user = await prisma.user.update({
    where: { email },
    data: { image },
  });

  return user;
}