import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/GlobalStyle'
import { themes } from './styles/theme'
import { useThemeStore } from './store/useThemeStore'
import { AppLayout } from './components/layout/AppLayout'
import { Loader } from './components/ui/Loader'

const Dashboard = lazy(() =>
  import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Transactions = lazy(() =>
  import('./pages/Transactions').then((m) => ({ default: m.Transactions })),
)
const Categories = lazy(() =>
  import('./pages/Categories').then((m) => ({ default: m.Categories })),
)
const Settings = lazy(() =>
  import('./pages/Settings').then((m) => ({ default: m.Settings })),
)

export function App() {
  const mode = useThemeStore((state) => state.mode)

  return (
    <ThemeProvider theme={themes[mode]}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="transacoes"
              element={
                <Suspense fallback={<Loader />}>
                  <Transactions />
                </Suspense>
              }
            />
            <Route
              path="categorias"
              element={
                <Suspense fallback={<Loader />}>
                  <Categories />
                </Suspense>
              }
            />
            <Route
              path="configuracoes"
              element={
                <Suspense fallback={<Loader />}>
                  <Settings />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Loader />}>
                  <Dashboard />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
