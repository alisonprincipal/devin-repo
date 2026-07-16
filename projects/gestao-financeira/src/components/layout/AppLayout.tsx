import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { useUiStore } from '../../store/useUiStore'

const Shell = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Main = styled.main`
  padding: ${({ theme }) => theme.space(7)} ${({ theme }) => theme.space(8)};
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 640px) {
    padding: ${({ theme }) => theme.space(5)} ${({ theme }) => theme.space(4)};
  }
`

const Backdrop = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 900px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgba(3, 6, 18, 0.5);
    backdrop-filter: blur(2px);
  }
`

export function AppLayout() {
  const { sidebarOpen, setSidebarOpen } = useUiStore()

  return (
    <Shell>
      <Sidebar />
      <Backdrop $open={sidebarOpen} onClick={() => setSidebarOpen(false)} />
      <Main>
        <Topbar />
        <Outlet />
      </Main>
    </Shell>
  )
}
