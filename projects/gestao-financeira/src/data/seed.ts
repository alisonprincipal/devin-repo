import type { FinanceData } from '../types'

const now = new Date()
const iso = (year: number, month: number, day: number) =>
  `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const y = now.getFullYear()
const m = now.getMonth() + 1

export const seedData: FinanceData = {
  categories: [
    { id: 'cat-salary', name: 'Salário', color: '#22d3ee', icon: '💼', type: 'income' },
    { id: 'cat-freela', name: 'Freelance', color: '#a78bfa', icon: '🧑‍💻', type: 'income' },
    { id: 'cat-invest', name: 'Investimentos', color: '#34d399', icon: '📈', type: 'income' },
    { id: 'cat-food', name: 'Alimentação', color: '#f472b6', icon: '🍔', type: 'expense' },
    { id: 'cat-home', name: 'Moradia', color: '#60a5fa', icon: '🏠', type: 'expense' },
    { id: 'cat-transport', name: 'Transporte', color: '#fbbf24', icon: '🚗', type: 'expense' },
    { id: 'cat-fun', name: 'Lazer', color: '#f87171', icon: '🎮', type: 'expense' },
    { id: 'cat-health', name: 'Saúde', color: '#4ade80', icon: '💊', type: 'expense' },
    { id: 'cat-shop', name: 'Compras', color: '#c084fc', icon: '🛍️', type: 'expense' },
  ],
  transactions: [
    {
      id: 'tx-1',
      type: 'income',
      amount: 6500,
      categoryId: 'cat-salary',
      description: 'Salário mensal',
      date: iso(y, m, 5),
      recurrence: 'monthly',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-2',
      type: 'income',
      amount: 1200,
      categoryId: 'cat-freela',
      description: 'Projeto freelance',
      date: iso(y, m, 12),
      recurrence: 'none',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-3',
      type: 'expense',
      amount: 1800,
      categoryId: 'cat-home',
      description: 'Aluguel',
      date: iso(y, m, 8),
      recurrence: 'monthly',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-4',
      type: 'expense',
      amount: 720,
      categoryId: 'cat-food',
      description: 'Supermercado',
      date: iso(y, m, 10),
      recurrence: 'none',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-5',
      type: 'expense',
      amount: 260,
      categoryId: 'cat-transport',
      description: 'Combustível',
      date: iso(y, m, 11),
      recurrence: 'none',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-6',
      type: 'expense',
      amount: 150,
      categoryId: 'cat-fun',
      description: 'Streaming e jogos',
      date: iso(y, m, 14),
      recurrence: 'monthly',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'tx-7',
      type: 'expense',
      amount: 320,
      categoryId: 'cat-health',
      description: 'Farmácia',
      date: iso(y, m, 15),
      recurrence: 'none',
      createdAt: new Date().toISOString(),
    },
  ],
}
