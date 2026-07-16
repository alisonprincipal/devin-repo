import styled from 'styled-components'
import { IconButton } from '../ui/Button'
import { useUiStore } from '../../store/useUiStore'
import { useThemeStore } from '../../store/useThemeStore'
import { addMonthsToKey, monthLabel } from '../../lib/format'

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  margin-bottom: ${({ theme }) => theme.space(7)};
  flex-wrap: wrap;
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
`

const Greeting = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const MonthSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(1.5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.pill};
  backdrop-filter: blur(12px);
`

const MonthLabel = styled.span`
  min-width: 150px;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
`

const MenuButton = styled(IconButton)`
  @media (min-width: 901px) {
    display: none;
  }
`

const RoundNav = styled.button`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primarySoft};
  }
`

export function Topbar() {
  const { monthKey, setMonthKey, toggleSidebar } = useUiStore()
  const { mode, toggle } = useThemeStore()

  return (
    <Bar>
      <Left>
        <MenuButton aria-label="Abrir menu" onClick={toggleSidebar}>
          ☰
        </MenuButton>
        <Greeting>
          <h1>Olá 👋</h1>
          <p>Aqui está o resumo das suas finanças</p>
        </Greeting>
      </Left>

      <Actions>
        <MonthSwitcher>
          <RoundNav
            aria-label="Mês anterior"
            onClick={() => setMonthKey(addMonthsToKey(monthKey, -1))}
          >
            ‹
          </RoundNav>
          <MonthLabel>{monthLabel(monthKey)}</MonthLabel>
          <RoundNav
            aria-label="Próximo mês"
            onClick={() => setMonthKey(addMonthsToKey(monthKey, 1))}
          >
            ›
          </RoundNav>
        </MonthSwitcher>

        <IconButton
          aria-label={mode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          onClick={toggle}
        >
          {mode === 'dark' ? '☀️' : '🌙'}
        </IconButton>
      </Actions>
    </Bar>
  )
}
