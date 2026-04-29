export const formatNumber = (value: number, locale = 'es-ES') =>
  new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value)
