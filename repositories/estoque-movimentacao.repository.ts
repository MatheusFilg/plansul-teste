import prisma from '@/lib/db';
import { estoque_movimentacoes } from '@/app/generated/prisma/client';

export const findAll = async (): Promise<estoque_movimentacoes[]> => {
  return prisma.estoque_movimentacoes.findMany();
};
