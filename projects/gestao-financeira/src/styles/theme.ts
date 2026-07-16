import type { ThemeMode } from '../types'

export interface AppTheme {
  mode: ThemeMode
  colors: {
    bg: string
    bgGradient: string
    surface: string
    surfaceAlt: string
    surfaceBorder: string
    glassBorder: string
    text: string
    textMuted: string
    primary: string
    primarySoft: string
    accent: string
    income: string
    expense: string
    danger: string
    success: string
    shadow: string
    glow: string
  }
  radii: {
    sm: string
    md: string
    lg: string
    pill: string
  }
  space: (n: number) => string
  font: {
    family: string
    mono: string
  }
}

const baseRadii = {
  sm: '8px',
  md: '14px',
  lg: '22px',
  pill: '999px',
}

const baseFont = {
  family: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', ui-monospace, monospace",
}

const space = (n: number) => `${n * 4}px`

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    bg: '#070b18',
    bgGradient:
      'radial-gradient(1200px 600px at 15% -10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(1000px 500px at 100% 0%, rgba(34,211,238,0.14), transparent 55%), #070b18',
    surface: 'rgba(20, 27, 48, 0.72)',
    surfaceAlt: 'rgba(30, 39, 66, 0.6)',
    surfaceBorder: 'rgba(255, 255, 255, 0.06)',
    glassBorder: 'rgba(148, 163, 184, 0.16)',
    text: '#e8ecf6',
    textMuted: '#93a0bd',
    primary: '#7c7bff',
    primarySoft: 'rgba(124, 123, 255, 0.16)',
    accent: '#22d3ee',
    income: '#34d399',
    expense: '#fb7185',
    danger: '#f43f5e',
    success: '#34d399',
    shadow: '0 20px 60px -20px rgba(2, 6, 23, 0.9)',
    glow: '0 0 30px -6px rgba(124, 123, 255, 0.5)',
  },
  radii: baseRadii,
  space,
  font: baseFont,
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    bg: '#eef1f8',
    bgGradient:
      'radial-gradient(1200px 600px at 10% -10%, rgba(99,102,241,0.16), transparent 60%), radial-gradient(1000px 500px at 100% 0%, rgba(34,211,238,0.16), transparent 55%), #eef1f8',
    surface: 'rgba(255, 255, 255, 0.82)',
    surfaceAlt: 'rgba(255, 255, 255, 0.6)',
    surfaceBorder: 'rgba(15, 23, 42, 0.06)',
    glassBorder: 'rgba(15, 23, 42, 0.08)',
    text: '#0f1b33',
    textMuted: '#5a6785',
    primary: '#5b5bef',
    primarySoft: 'rgba(91, 91, 239, 0.12)',
    accent: '#0891b2',
    income: '#059669',
    expense: '#e11d48',
    danger: '#e11d48',
    success: '#059669',
    shadow: '0 20px 50px -24px rgba(15, 23, 42, 0.35)',
    glow: '0 0 30px -8px rgba(91, 91, 239, 0.35)',
  },
  radii: baseRadii,
  space,
  font: baseFont,
}

export const themes: Record<ThemeMode, AppTheme> = {
  dark: darkTheme,
  light: lightTheme,
}
