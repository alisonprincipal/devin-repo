import { create } from 'zustand'
import type { Category, FinanceData, Transaction } from '../types'
import { loadData, saveData } from '../lib/storage'
import { createId } from '../lib/id'
import { seedData } from '../data/seed'

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>
type CategoryInput = Omit<Category, 'id'>

interface FinanceState extends FinanceData {
  addTransaction: (input: TransactionInput) => void
  updateTransaction: (id: string, input: TransactionInput) => void
  deleteTransaction: (id: string) => void
  addCategory: (input: CategoryInput) => void
  updateCategory: (id: string, input: Partial<CategoryInput>) => void
  deleteCategory: (id: string) => void
  importData: (data: FinanceData) => void
  resetData: () => void
}

const persist = (state: FinanceData) => {
  saveData({ transactions: state.transactions, categories: state.categories })
}

export const useFinanceStore = create<FinanceState>((set, get) => {
  const initial = loadData()

  return {
    transactions: initial.transactions,
    categories: initial.categories,

    addTransaction: (input) => {
      const transaction: Transaction = {
        ...input,
        id: createId('tx'),
        createdAt: new Date().toISOString(),
      }
      const transactions = [transaction, ...get().transactions]
      set({ transactions })
      persist({ transactions, categories: get().categories })
    },

    updateTransaction: (id, input) => {
      const transactions = get().transactions.map((tx) =>
        tx.id === id ? { ...tx, ...input } : tx,
      )
      set({ transactions })
      persist({ transactions, categories: get().categories })
    },

    deleteTransaction: (id) => {
      const transactions = get().transactions.filter((tx) => tx.id !== id)
      set({ transactions })
      persist({ transactions, categories: get().categories })
    },

    addCategory: (input) => {
      const category: Category = { ...input, id: createId('cat') }
      const categories = [...get().categories, category]
      set({ categories })
      persist({ transactions: get().transactions, categories })
    },

    updateCategory: (id, input) => {
      const categories = get().categories.map((cat) =>
        cat.id === id ? { ...cat, ...input } : cat,
      )
      set({ categories })
      persist({ transactions: get().transactions, categories })
    },

    deleteCategory: (id) => {
      const categories = get().categories.filter((cat) => cat.id !== id)
      const transactions = get().transactions.filter(
        (tx) => tx.categoryId !== id,
      )
      set({ categories, transactions })
      persist({ transactions, categories })
    },

    importData: (data) => {
      set({ transactions: data.transactions, categories: data.categories })
      persist(data)
    },

    resetData: () => {
      set({
        transactions: seedData.transactions,
        categories: seedData.categories,
      })
      persist(seedData)
    },
  }
})
