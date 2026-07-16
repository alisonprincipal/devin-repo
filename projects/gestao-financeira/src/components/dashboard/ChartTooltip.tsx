import styled from 'styled-components'

const Box = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(14px);
  padding: ${({ theme }) => `${theme.space(2.5)} ${theme.space(3)}`};
  font-size: 0.82rem;

  .label {
    font-weight: 700;
    margin-bottom: ${({ theme }) => theme.space(1.5)};
  }

  .row {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space(2)};
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }

  .value {
    margin-left: auto;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-variant-numeric: tabular-nums;
  }
`

interface TooltipEntry {
  name?: string
  value?: number
  color?: string
  payload?: Record<string, unknown>
}

interface Props {
  active?: boolean
  label?: string
  payload?: TooltipEntry[]
  formatter: (value: number) => string
}

export function ChartTooltip({ active, label, payload, formatter }: Props) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <Box>
      {label && <div className="label">{label}</div>}
      {payload.map((entry, index) => (
        <div className="row" key={index}>
          <span className="dot" style={{ background: entry.color }} />
          <span>{entry.name}</span>
          <span className="value">{formatter(entry.value ?? 0)}</span>
        </div>
      ))}
    </Box>
  )
}
