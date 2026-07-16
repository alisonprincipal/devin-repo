import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import styled, { useTheme } from 'styled-components'
import type { CategorySlice } from '../../lib/selectors'
import { formatCurrency } from '../../lib/format'
import { ChartTooltip } from './ChartTooltip'
import { EmptyState } from '../ui/EmptyState'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${({ theme }) => theme.space(4)};
  align-items: center;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`

const Legend = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  max-height: 220px;
  overflow-y: auto;
`

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2.5)};
  font-size: 0.88rem;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  .name {
    color: ${({ theme }) => theme.colors.text};
  }

  .value {
    margin-left: auto;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .pct {
    width: 46px;
    text-align: right;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.78rem;
  }
`

interface Props {
  data: CategorySlice[]
}

export function CategoryDonut({ data }: Props) {
  const theme = useTheme()

  if (data.length === 0) {
    return (
      <EmptyState
        icon="🥧"
        title="Sem despesas neste mês"
        description="Cadastre despesas para visualizar a distribuição por categoria."
      />
    )
  }

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={88}
            paddingAngle={2}
            stroke={theme.colors.surface}
            strokeWidth={2}
          >
            {data.map((slice) => (
              <Cell key={slice.categoryId} fill={slice.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={formatCurrency} />} />
        </PieChart>
      </ResponsiveContainer>

      <Legend>
        {data.map((slice) => (
          <LegendItem key={slice.categoryId}>
            <span className="dot" style={{ background: slice.color }} />
            <span className="name">
              {slice.icon} {slice.name}
            </span>
            <span className="value">{formatCurrency(slice.value)}</span>
            <span className="pct">{slice.percentage.toFixed(0)}%</span>
          </LegendItem>
        ))}
      </Legend>
    </Wrapper>
  )
}
