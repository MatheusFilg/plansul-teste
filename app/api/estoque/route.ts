import { NextResponse } from "next/server";
import * as service from "@/services/estoque.service";

export async function GET() {
	const estoque = await service.getAllEstoque();
	const produtosSerialized = estoque.map((estoque) => {
		return JSON.parse(
			JSON.stringify(estoque, (_, value) =>
				typeof value === "bigint" ? value.toString() : value,
			),
		);
	});

	return NextResponse.json(produtosSerialized);
}
