import * as repository from '@/repositories/estoque-movimentacao.repository';
import { estoque_movimentacoes } from '@/app/generated/prisma/client';

export const getAllEstoqueMovimentacao = async (): Promise<estoque_movimentacoes[]> => {
  return repository.findAll();
};

