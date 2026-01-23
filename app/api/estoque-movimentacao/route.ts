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

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { produto_id, quantidade, tipo } = body;

		if (!produto_id || !quantidade || !tipo) {
			return NextResponse.json(
				{ error: "Dados inválidos" },
				{ status: 400 },
			);
		}

		const newMovimentacao = await service.createEstoqueMovimentacao({
      produto_id,
      quantidade,
      tipo
		});
		const newMovimentacaoSerialized = JSON.parse(
			JSON.stringify(newMovimentacao, (key, value) =>
				typeof value === "bigint" ? value.toString() : value,
			),
		);
		return NextResponse.json(newMovimentacaoSerialized, { status: 201 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Falha ao criar movimentação" },
			{ status: 500 },
		);
	}
}