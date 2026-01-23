import * as repository from '@/repositories/estoque-movimentacao.repository';
import { estoque_movimentacoes } from '@/app/generated/prisma/client';

export const getAllEstoqueMovimentacao = async (): Promise<estoque_movimentacoes[]> => {
  return repository.findAll();
};

export const createEstoqueMovimentacao = async (data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>): Promise<estoque_movimentacoes> => {
  const { produto_id, quantidade, tipo} = data;
  const newMovimentacao = await repository.criarMovimentacao({ produto_id, quantidade, tipo });
  return newMovimentacao;
};