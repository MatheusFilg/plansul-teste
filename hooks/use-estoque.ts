import { useQuery, } from "@tanstack/react-query";

// Types
export type Estoque = {
	id: string; // Prisma BigInt is serialized as string
	atualizado_em: Date;
	produto_id: string;
	quantidade: number;
};

// API Functions
const fetchEstoque = async (): Promise<Estoque[]> => {
	const response = await fetch("/api/estoque");
	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}
	return response.json();
};

// React Query Hooks
export const useEstoque = () => {
	return useQuery<Estoque[], Error>({
		queryKey: ["estoque"],
		queryFn: fetchEstoque,
	});
};