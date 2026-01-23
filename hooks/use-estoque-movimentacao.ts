
import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import z from "zod";

// Zod Schemas
export const createMovimentacaoSchema = z.object({
  quantidade: z.coerce.number().min(1, "A quantidade deve ser no mínimo 1"),
  tipo: z.enum(["entrada", "saida"]),
  produto_id: z.string(),
});


// Types
export type EstoqueMovimentacao = {
	id: string; 
	tipo: "saida" | "entrada";
	produto_id: string;
  quantidade: number;
	criado_em: Date
};

export type CreateMovimentacaoPayload = z.infer<typeof createMovimentacaoSchema>;

// API Functions
const fetchEstoqueMovimentacao = async (): Promise<EstoqueMovimentacao[]> => {
	const response = await fetch("/api/estoque-movimentacao");
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return response.json();
};

const createMovimentacao = async (
  payload: CreateMovimentacaoPayload
): Promise<EstoqueMovimentacao> => {
  const response = await fetch("/api/estoque-movimentacao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create transaction");
  }
  return response.json();
};

// React Query Hooks
export const useEstoqueMovimentacao = () => {
	return useQuery<EstoqueMovimentacao[], Error>({
		queryKey: ["estoque-movimentacao"],
		queryFn: fetchEstoqueMovimentacao,
	});
};

export const useCreateMovimentacao = () => {
  const queryClient = useQueryClient();
	return useMutation<EstoqueMovimentacao, Error, CreateMovimentacaoPayload>({
    mutationFn: createMovimentacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estoque-movimentacao"] });
    },
	});
};
