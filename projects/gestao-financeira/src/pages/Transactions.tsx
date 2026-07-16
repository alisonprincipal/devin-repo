import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useFinanceStore } from '../store/useFinanceStore'
import { useUiStore } from '../store/useUiStore'
import type { Transaction, TransactionType } from '../types'
import { filterByMonth, summarize } from '../lib/selectors'
import { formatCurrency } from '../lib/format'
import { Page, SectionHeader } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Field'
import { Modal } from '../components/ui/Modal'
import { TransactionList } from '../components/transactions/TransactionList'
import {
  TransactionForm,
  type TransactionFormValues,
} from '../components/transactions/TransactionForm'

type Filter = 'all' | TransactionType

const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
  flex-wrap: wrap;
  align-items: center;
`

const SearchBox = styled.div`
  flex: 1;
  min-width: 200px;
`

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => theme.space(1)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 0.85rem;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primarySoft : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
  transition: background 0.2s ease, color 0.2s ease;
`

const Totals = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(5)};
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};

  b {
    font-variant-numeric: tabular-nums;
  }
`

export function Transactions() {
  const {
    transactions,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinanceStore()
  const { monthKey } = useUiStore()

  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const monthTx = useMemo(
    () => filterByMonth(transactions, monthKey),
    [transactions, monthKey],
  )
  const summary = useMemo(() => summarize(monthTx), [monthTx])

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase()
    return monthTx
      .filter((tx) => (filter === 'all' ? true : tx.type === filter))
      .filter((tx) => {
        if (!term) return true
        const category = categories.find((cat) => cat.id === tx.categoryId)
        return (
          tx.description.toLowerCase().includes(term) ||
          (category?.name.toLowerCase().includes(term) ?? false)
        )
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [monthTx, filter, search, categories])

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const handleSubmit = (values: TransactionFormValues) => {
    if (editing) updateTransaction(editing.id, values)
    else addTransaction(values)
    closeForm()
  }

  return (
    <Page>
      <SectionHeader>
        <div>
          <h2>Transações</h2>
          <p>Gerencie todas as entradas e despesas do mês.</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>+ Nova transação</Button>
      </SectionHeader>

      <Card>
        <Toolbar>
          <SearchBox>
            <Input
              type="search"
              placeholder="Buscar por descrição ou categoria..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>
          <Filters>
            {(['all', 'income', 'expense'] as const).map((option) => (
              <FilterButton
                key={option}
                $active={filter === option}
                onClick={() => setFilter(option)}
              >
                {option === 'all'
                  ? 'Todas'
                  : option === 'income'
                    ? 'Entradas'
                    : 'Despesas'}
              </FilterButton>
            ))}
          </Filters>
        </Toolbar>

        <div style={{ margin: '16px 0' }}>
          <Totals>
            <span>
              Entradas: <b style={{ color: '#34d399' }}>{formatCurrency(summary.income)}</b>
            </span>
            <span>
              Despesas: <b style={{ color: '#fb7185' }}>{formatCurrency(summary.expense)}</b>
            </span>
            <span>
              Saldo: <b>{formatCurrency(summary.balance)}</b>
            </span>
          </Totals>
        </div>

        <TransactionList
          transactions={visible}
          categories={categories}
          onEdit={(tx) => {
            setEditing(tx)
            setFormOpen(true)
          }}
          onDelete={deleteTransaction}
        />
      </Card>

      {formOpen && (
        <Modal
          title={editing ? 'Editar transação' : 'Nova transação'}
          onClose={closeForm}
        >
          <TransactionForm
            categories={categories}
            initialValues={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}
    </Page>
  )
}
