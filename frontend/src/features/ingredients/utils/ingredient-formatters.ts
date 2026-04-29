export const ingredientSubtitle = (name: string, sku?: string | null) => (sku ? `${name} · ${sku}` : name)
