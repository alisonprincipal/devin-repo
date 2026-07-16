import styled from 'styled-components'
import type { Category, Transaction } from '../../types'
import { formatCurrency, formatDate } from '../../lib/format'
import { EmptyState } from '../ui/EmptyState'

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
`

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => `${theme.space(3)} ${theme.space(3.5)}`};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(2px);
  }
`

const Icon = styled.span<{ $color: string }>`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $color }) => $color}22;
  font-size: 1.2rem;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    font-size: 0.95rem;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textMuted};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space(1.5)};
  }
`

const Tag = styled.span`
  padding: 1px 7px;
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.primarySoft};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.68rem;
  font-weight: 600;
`

const Amount = styled.strong<{ $type: Transaction['type'] }>`
  margin-left: auto;
  font-size: 1rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: ${({ $type, theme }) =>
    $type === 'income' ? theme.colors.income : theme.colors.expense};
`

const Controls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(1)};
`

const MiniButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
  }
`

interface Props {
  transactions: Transaction[]
  categories: Category[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

export function TransactionList({
  transactions,
  categories,
  onEdit,
  onDelete,
}: Props) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        icon="🧾"
        title="Nenhuma transação neste mês"
        description="Adicione entradas e despesas para acompanhar suas finanças."
      />
    )
  }

  const categoryOf = (id: string) => categories.find((cat) => cat.id === id)

  return (
    <List>
      {transactions.map((tx) => {
        const category = categoryOf(tx.categoryId)
        return (
          <Item key={tx.id}>
            <Icon $color={category?.color ?? '#94a3b8'}>
              {category?.icon ?? '❓'}
            </Icon>
            <Info>
              <strong>{tx.description}</strong>
              <span>
                {category?.name ?? 'Sem categoria'} · {formatDate(tx.date)}
                {tx.recurrence === 'monthly' && <Tag>mensal</Tag>}
              </span>
            </Info>
            <Amount $type={tx.type}>
              {tx.type === 'income' ? '+' : '−'} {formatCurrency(tx.amount)}
            </Amount>
            <Controls>
              <MiniButton aria-label="Editar" onClick={() => onEdit(tx)}>
                ✎
              </MiniButton>
              <MiniButton aria-label="Excluir" onClick={() => onDelete(tx.id)}>
                🗑
              </MiniButton>
            </Controls>
          </Item>
        )
      })}
    </List>
  )
}
