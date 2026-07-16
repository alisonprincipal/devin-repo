const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatCurrency = (value: number): string =>
  currencyFormatter.format(value)

export const formatCompactCurrency = (value: number): string => {
  if (Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
  }
  return currencyFormatter.format(value)
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const monthLabel = (monthKey: string): string => {
  const [year, month] = monthKey.split('-').map(Number)
  return `${monthNames[month - 1]} ${year}`
}

export const shortMonthLabel = (monthKey: string): string => {
  const [year, month] = monthKey.split('-').map(Number)
  return `${monthNames[month - 1].slice(0, 3)}/${String(year).slice(2)}`
}

/** Returns a yyyy-MM key from an ISO date string (yyyy-MM-dd). */
export const toMonthKey = (isoDate: string): string => isoDate.slice(0, 7)

export const currentMonthKey = (): string => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export const addMonthsToKey = (monthKey: string, delta: number): string => {
  const [year, month] = monthKey.split('-').map(Number)
  const date = new Date(year, month - 1 + delta, 1)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export const formatDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

export const todayIso = (): string => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`
}
