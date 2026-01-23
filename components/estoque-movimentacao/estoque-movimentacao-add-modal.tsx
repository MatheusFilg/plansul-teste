"use client";

import * as z from "zod";
import { BaseModal } from "@/components/custom/base-modal";
import { DynamicForm } from "@/components/custom/dynamic-form";
import { toast } from "sonner";
import { createMovimentacaoSchema, useCreateMovimentacao } from "@/hooks/use-estoque-movimentacao";
import { useProdutos } from "@/hooks/use-produtos";

export function AddTransactionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const createMovimentacaoMutation = useCreateMovimentacao();

  const {data: produtos, isLoading: isLoadingProdutos} = useProdutos()
  
  const produtosOptions = produtos?.map(produto => ({
      label: produto.nome,
      value: produto.id.toString(),
    })) || [];
  
  const formFields = [
    {
      name: "produto_id" as const,
      label: "Id do Produto",
      component: "select" as const,
      options: produtosOptions,
      placeholder: isLoadingProdutos ? "Carregando produtos..." : "Selecione um produto",
      isLoading: isLoadingProdutos,
    },
    {
      name: "tipo" as const,
      label: "Tipo da Movimentação",
      placeholder: "Selecione um tipo",
      component: "select" as const,
      options: [
        { label: "Entrada", value: "entrada" },
        { label: "Saída", value: "saida" },
      ],
    },
    {
      name: "quantidade" as const,
      label: "Quantidade",
      placeholder: "0",
      type: "number",
      component: "input" as const,
    },
  ];

  const handleSubmit = (data: z.infer<typeof createMovimentacaoSchema>) => {
    createMovimentacaoMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Movimentação criado com sucesso!");
        onClose();
      },
      onError: (error) => {
        toast.error(`Erro ao criar movimentação: ${error.message}`);
      },
    });
  };

  return (
    <BaseModal
      title="Nova Movimentação"
      description="Preencha os detalhes para criar uma movimentação no estoque."
      isOpen={isOpen}
      onClose={onClose}
    >
      <DynamicForm
        schema={createMovimentacaoSchema}
        onSubmit={handleSubmit}
        fields={formFields}
        defaultValues={{
          produto_id: "1",
          quantidade: 0,
          tipo: "entrada",
        }}
        submitButtonText="Criar Movimentação"
        isSubmitting={createMovimentacaoMutation.isPending}
      />
    </BaseModal>
  );
}
