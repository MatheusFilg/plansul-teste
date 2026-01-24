export function getUniqueColumnValues<TData>(
  data: TData[],
  columnId: string
): unknown[] {
  const values = new Set<unknown>();
  
  data.forEach((row) => {
    let currentValue: any = row;
    const keys = columnId.split('.');

    for (const key of keys) {
      if (currentValue === null || typeof currentValue !== 'object') {
        currentValue = undefined;
        break;
      }
      currentValue = currentValue[key];
    }
    
    if (typeof currentValue === "object" && currentValue !== null && "id" in currentValue && (columnId === 'produto_id' || columnId === 'categoria_id' || columnId === 'estoque_movimentacao.produto_id')) {
      currentValue = currentValue.id;
    }

    if (currentValue !== undefined && currentValue !== null) {
      values.add(currentValue);
    }
  });

  return Array.from(values).sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') return a - b;
      return String(a).localeCompare(String(b));
  });
}