export type TransactionType = 'income' | 'expense'

export type RecurrenceType = 'none' | 'monthly'

export interface Category {
  id: string
  name: string
  color: string
  icon: string
  type: TransactionType
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  categoryId: string
  description: string
  /** ISO date string (yyyy-MM-dd) */
  date: string
  recurrence: RecurrenceType
  createdAt: string
}

export interface FinanceData {
  transactions: Transaction[]
  categories: Category[]
}

export type ThemeMode = 'light' | 'dark'
