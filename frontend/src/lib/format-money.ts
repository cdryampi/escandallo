export const formatMoney = (
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale = 'es-ES',
  currency = 'EUR',
) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
