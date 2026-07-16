import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useUiStore } from '../../store/useUiStore'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/transacoes', label: 'Transações', icon: '💸', end: false },
  { to: '/categorias', label: 'Categorias', icon: '🏷️', end: false },
  { to: '/configuracoes', label: 'Configurações', icon: '⚙️', end: false },
]

const Aside = styled.aside<{ $open: boolean }>`
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  width: 260px;
  padding: ${({ theme }) => theme.space(6)} ${({ theme }) => theme.space(5)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(8)};
  border-right: 1px solid ${({ theme }) => theme.colors.surfaceBorder};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(18px);
  z-index: 50;

  @media (max-width: 900px) {
    position: fixed;
    inset: 0 auto 0 0;
    transform: translateX(${({ $open }) => ($open ? '0' : '-110%')});
    transition: transform 0.3s ease;
    box-shadow: ${({ $open, theme }) => ($open ? theme.colors.shadow : 'none')};
  }
`

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const Logo = styled.div`
  width: 42px;
  height: 42px;
  border-radius: ${({ theme }) => theme.radii.md};
  display: grid;
  place-items: center;
  font-size: 1.4rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.accent}
  );
  box-shadow: ${({ theme }) => theme.colors.glow};
`

const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;

  strong {
    font-size: 1.05rem;
    font-weight: 800;
  }
  span {
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1.5)};
`

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => `${theme.space(3)} ${theme.space(3.5)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.2s ease, color 0.2s ease;

  span.icon {
    font-size: 1.1rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }

  &.active {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.primarySoft};
    box-shadow: inset 3px 0 0 ${({ theme }) => theme.colors.primary};
  }
`

const Footer = styled.div`
  margin-top: auto;
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUiStore()

  return (
    <Aside $open={sidebarOpen}>
      <Brand>
        <Logo>◈</Logo>
        <BrandText>
          <strong>Finia</strong>
          <span>Gestão Financeira</span>
        </BrandText>
      </Brand>

      <Nav>
        {navItems.map((item) => (
          <Item
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </Item>
        ))}
      </Nav>

      <Footer>
        Seus dados ficam salvos localmente
        <br />
        neste navegador.
      </Footer>
    </Aside>
  )
}
