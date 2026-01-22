import { NextResponse } from "next/server";
import * as service from "@/services/estoque-movimentacao.service";

export async function GET() {
	const estoqueMovimentacao = await service.getAllEstoqueMovimentacao();
	const estoqueMovimentacaoSerialized = estoqueMovimentacao.map((movimentacao) => {
		return JSON.parse(
			JSON.stringify(movimentacao, (_, value) =>
				typeof value === "bigint" ? value.toString() : value,
			),
		);
	});

	return NextResponse.json(estoqueMovimentacaoSerialized);
}
