import * as repository from '@/repositories/estoque.repository';
import { estoque } from '@/app/generated/prisma/client';

export const getAllEstoque = async (): Promise<estoque[]> => {
  return repository.findAll();
};

