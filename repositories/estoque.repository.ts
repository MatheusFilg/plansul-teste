import prisma from '@/lib/db';
import { estoque } from '@/app/generated/prisma/client';

export const findAll = async (): Promise<estoque[]> => {
  return prisma.estoque.findMany();
};
