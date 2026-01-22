
import { useQuery, } from "@tanstack/react-query";

// Types
export type EstoqueMovimentacao = {
	id: string; 
	tipo: "saida" | "entrada";
	produto_id: string;
  quantidade: number;
	criado_em: Date
};

// API Functions
const fetchEstoqueMovimentacao = async (): Promise<EstoqueMovimentacao[]> => {
	const response = await fetch("/api/estoque-movimentacao");
	if (!response.ok) {
		throw new Error("Failed to fetch products");
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