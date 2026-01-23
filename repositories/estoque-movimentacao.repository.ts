import prisma from '@/lib/db';
import { estoque_movimentacoes } from '@/app/generated/prisma/client';

export const findAll = async (): Promise<estoque_movimentacoes[]> => {
  return prisma.estoque_movimentacoes.findMany();
};

export const criarMovimentacao = async (
		data: Omit<estoque_movimentacoes, 'id' | 'criado_em'>,
): Promise<estoque_movimentacoes> => {
	
  const novaMovimentacao = await prisma.$transaction(async (tx) => {
    const movimentacaoCriada = await tx.estoque_movimentacoes.create({
      data: {
        produto_id: data.produto_id,
        tipo: data.tipo,
        quantidade: data.quantidade,
      },
    });

    if (data.produto_id === null || data.produto_id === undefined) {
      throw new Error("ID do produto não pode ser nulo ou indefinido.");
    }
    const produtoIdBigInt = typeof data.produto_id === 'bigint' ? data.produto_id : BigInt(data.produto_id);

    const produtoEstoque = await tx.estoque.findUnique({
      where: { produto_id: produtoIdBigInt },
    });

    if (!produtoEstoque) {
      throw new Error("Estoque não encontrado para este produto.");
    }

    let novaQuantidade = produtoEstoque.quantidade;

    if (data.tipo === 'entrada') {
      novaQuantidade += data.quantidade;
    } else if (data.tipo === 'saida') {
      if (produtoEstoque.quantidade < data.quantidade) {
        throw new Error("Quantidade insuficiente em estoque.");
      }
      novaQuantidade -= data.quantidade;
    }

    await tx.estoque.update({
      where: { id: produtoEstoque.id },
      data: {
        quantidade: novaQuantidade,
        atualizado_em: new Date()
      },
    });

    return movimentacaoCriada;
  });

  return novaMovimentacao;
};
