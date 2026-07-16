import type { FinanceData } from '../types'
import { seedData } from '../data/seed'

const STORAGE_KEY = 'gestao-financeira:data:v1'

const isFinanceData = (value: unknown): value is FinanceData => {
  if (typeof value !== 'object' || value === null) return false
  const data = value as Partial<FinanceData>
  return Array.isArray(data.transactions) && Array.isArray(data.categories)
}

export const loadData = (): FinanceData => {
  if (typeof window === 'undefined') return seedData
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedData
    const parsed: unknown = JSON.parse(raw)
    if (isFinanceData(parsed)) return parsed
    return seedData
  } catch {
    return seedData
  }
}

export const saveData = (data: FinanceData): void => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* storage full or unavailable — ignore */
  }
}

export const parseImportedData = (raw: string): FinanceData => {
  const parsed: unknown = JSON.parse(raw)
  if (!isFinanceData(parsed)) {
    throw new Error('Arquivo inválido: estrutura de dados não reconhecida.')
  }
  return parsed
}
