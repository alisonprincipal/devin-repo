import type { Category, Transaction } from '../types'
import { addMonthsToKey, shortMonthLabel, toMonthKey } from './format'

export interface MonthSummary {
  income: number
  expense: number
  balance: number
}

export const filterByMonth = (
  transactions: Transaction[],
  monthKey: string,
): Transaction[] => transactions.filter((tx) => toMonthKey(tx.date) === monthKey)

export const summarize = (transactions: Transaction[]): MonthSummary => {
  return transactions.reduce<MonthSummary>(
    (acc, tx) => {
      if (tx.type === 'income') acc.income += tx.amount
      else acc.expense += tx.amount
      acc.balance = acc.income - acc.expense
      return acc
    },
    { income: 0, expense: 0, balance: 0 },
  )
}

export interface CategorySlice {
  categoryId: string
  name: string
  color: string
  icon: string
  value: number
  percentage: number
}

export const expensesByCategory = (
  transactions: Transaction[],
  categories: Category[],
): CategorySlice[] => {
  const expenses = transactions.filter((tx) => tx.type === 'expense')
  const total = expenses.reduce((sum, tx) => sum + tx.amount, 0)
  const byCategory = new Map<string, number>()

  for (const tx of expenses) {
    byCategory.set(tx.categoryId, (byCategory.get(tx.categoryId) ?? 0) + tx.amount)
  }

  return [...byCategory.entries()]
    .map(([categoryId, value]) => {
      const category = categories.find((cat) => cat.id === categoryId)
      return {
        categoryId,
        name: category?.name ?? 'Sem categoria',
        color: category?.color ?? '#94a3b8',
        icon: category?.icon ?? '❓',
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,
      }
    })
    .sort((a, b) => b.value - a.value)
}

export interface MonthlyPoint {
  monthKey: string
  label: string
  income: number
  expense: number
}

export const monthlySeries = (
  transactions: Transaction[],
  anchorMonthKey: string,
  months = 6,
): MonthlyPoint[] => {
  const points: MonthlyPoint[] = []
  for (let i = months - 1; i >= 0; i -= 1) {
    const monthKey = addMonthsToKey(anchorMonthKey, -i)
    const summary = summarize(filterByMonth(transactions, monthKey))
    points.push({
      monthKey,
      label: shortMonthLabel(monthKey),
      income: summary.income,
      expense: summary.expense,
    })
  }
  return points
}
