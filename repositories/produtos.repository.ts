import prisma from '@/lib/db';
import { produtos } from '@/app/generated/prisma/client';

export const findAll = async (): Promise<produtos[]> => {
  return prisma.produtos.findMany({
    include: { categorias: true },
  });
};

export const findById = async (id: bigint): Promise<produtos | null> => {
  return prisma.produtos.findUnique({
    where: { id },
    include: { categorias: true },
  });
};

export async function createProduto(produtoData: {
  sku: string;
  nome: string;
  categoria_id?: bigint | null;
  estoque_minimo?: number | null;
  marca?: string | null;
}): Promise<produtos> { 
  try {
    const createdProduto = await prisma.$transaction(async (tx) => {
      const produto = await tx.produtos.create({
        data: {
          sku: produtoData.sku,
          nome: produtoData.nome,
          categoria_id: produtoData.categoria_id,
          estoque_minimo: produtoData.estoque_minimo ?? 0,
          marca: produtoData.marca,
        },
      });

      await tx.estoque.create({
        data: {
          produto_id: produto.id,
          quantidade: produtoData.estoque_minimo ?? 0, 
        },
      });

      return produto;
    });

    return createdProduto;
  } catch (error) {
    console.error("Error creating product and initial stock:", error);
    throw error;
  }
}

export const update = async (id: bigint, data: Partial<Omit<produtos, 'id' | 'criado_em'>>): Promise<produtos> => {
  return prisma.produtos.update({
    where: { id },
    data,
  });
};

export const remove = async (id: bigint): Promise<produtos> => {
  return prisma.produtos.delete({
    where: { id },
  });
};
