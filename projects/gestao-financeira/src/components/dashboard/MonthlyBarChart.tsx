import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useTheme } from 'styled-components'
import type { MonthlyPoint } from '../../lib/selectors'
import { formatCompactCurrency, formatCurrency } from '../../lib/format'
import { ChartTooltip } from './ChartTooltip'

interface Props {
  data: MonthlyPoint[]
}

export function MonthlyBarChart({ data }: Props) {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
        <CartesianGrid
          strokeDasharray="4 4"
          vertical={false}
          stroke={theme.colors.glassBorder}
        />
        <XAxis
          dataKey="label"
          tick={{ fill: theme.colors.textMuted, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: theme.colors.textMuted, fontSize: 12 }}
          tickFormatter={(value: number) => formatCompactCurrency(value)}
          axisLine={false}
          tickLine={false}
          width={70}
        />
        <Tooltip
          cursor={{ fill: theme.colors.primarySoft }}
          content={<ChartTooltip formatter={formatCurrency} />}
        />
        <Legend
          wrapperStyle={{ fontSize: 12, color: theme.colors.textMuted }}
          iconType="circle"
        />
        <Bar
          dataKey="income"
          name="Entradas"
          fill={theme.colors.income}
          radius={[6, 6, 0, 0]}
          maxBarSize={26}
        />
        <Bar
          dataKey="expense"
          name="Despesas"
          fill={theme.colors.expense}
          radius={[6, 6, 0, 0]}
          maxBarSize={26}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
