import { create } from 'zustand'
import { currentMonthKey } from '../lib/format'

interface UiState {
  monthKey: string
  setMonthKey: (monthKey: string) => void
  sidebarOpen: boolean
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
}

export const useUiStore = create<UiState>((set, get) => ({
  monthKey: currentMonthKey(),
  setMonthKey: (monthKey) => set({ monthKey }),
  sidebarOpen: false,
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
