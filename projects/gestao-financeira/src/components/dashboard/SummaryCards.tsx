import styled from 'styled-components'
import { Card } from '../ui/Card'
import { formatCurrency } from '../../lib/format'
import type { MonthSummary } from '../../lib/selectors'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space(4)};

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`

const StatCard = styled(Card)<{ $accent: string }>`
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.space(5)};

  &::after {
    content: '';
    position: absolute;
    top: -40px;
    right: -30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: 0.18;
    filter: blur(18px);
  }
`

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space(3)};
`

const Label = styled.span`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Emoji = styled.span<{ $accent: string }>`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $accent }) => $accent}22;
  font-size: 1.1rem;
`

const Value = styled.strong<{ $color?: string }>`
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ $color, theme }) => $color ?? theme.colors.text};
`

interface Props {
  summary: MonthSummary
}

export function SummaryCards({ summary }: Props) {
  return (
    <Grid>
      <StatCard $accent="#34d399">
        <Head>
          <Label>Entradas</Label>
          <Emoji $accent="#34d399">↑</Emoji>
        </Head>
        <Value $color="#34d399">{formatCurrency(summary.income)}</Value>
      </StatCard>

      <StatCard $accent="#fb7185">
        <Head>
          <Label>Despesas</Label>
          <Emoji $accent="#fb7185">↓</Emoji>
        </Head>
        <Value $color="#fb7185">{formatCurrency(summary.expense)}</Value>
      </StatCard>

      <StatCard $accent="#7c7bff">
        <Head>
          <Label>Saldo</Label>
          <Emoji $accent="#7c7bff">◈</Emoji>
        </Head>
        <Value $color={summary.balance >= 0 ? undefined : '#fb7185'}>
          {formatCurrency(summary.balance)}
        </Value>
      </StatCard>
    </Grid>
  )
}
