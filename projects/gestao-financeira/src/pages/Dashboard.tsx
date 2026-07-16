import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useFinanceStore } from '../store/useFinanceStore'
import { useUiStore } from '../store/useUiStore'
import type { Transaction } from '../types'
import {
  expensesByCategory,
  filterByMonth,
  monthlySeries,
  summarize,
} from '../lib/selectors'
import { Page, SectionHeader } from '../components/ui/Section'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { SummaryCards } from '../components/dashboard/SummaryCards'
import { MonthlyBarChart } from '../components/dashboard/MonthlyBarChart'
import { CategoryDonut } from '../components/dashboard/CategoryDonut'
import { TransactionList } from '../components/transactions/TransactionList'
import {
  TransactionForm,
  type TransactionFormValues,
} from '../components/transactions/TransactionForm'

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: ${({ theme }) => theme.space(4)};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`

export function Dashboard() {
  const {
    transactions,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useFinanceStore()
  const { monthKey } = useUiStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)

  const monthTx = useMemo(
    () => filterByMonth(transactions, monthKey),
    [transactions, monthKey],
  )
  const summary = useMemo(() => summarize(monthTx), [monthTx])
  const categorySlices = useMemo(
    () => expensesByCategory(monthTx, categories),
    [monthTx, categories],
  )
  const series = useMemo(
    () => monthlySeries(transactions, monthKey, 6),
    [transactions, monthKey],
  )
  const recent = useMemo(
    () => [...monthTx].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 5),
    [monthTx],
  )

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const handleSubmit = (values: TransactionFormValues) => {
    if (editing) updateTransaction(editing.id, values)
    else addTransaction(values)
    closeForm()
  }

  const handleEdit = (transaction: Transaction) => {
    setEditing(transaction)
    setFormOpen(true)
  }

  return (
    <Page>
      <SectionHeader>
        <div>
          <h2>Visão geral</h2>
          <p>Acompanhe entradas, despesas e saldo do mês.</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>+ Nova transação</Button>
      </SectionHeader>

      <SummaryCards summary={summary} />

      <ChartsGrid>
        <Card>
          <CardTitle>Evolução (6 meses)</CardTitle>
          <div style={{ marginTop: 16 }}>
            <MonthlyBarChart data={series} />
          </div>
        </Card>
        <Card>
          <CardTitle>Despesas por categoria</CardTitle>
          <div style={{ marginTop: 16 }}>
            <CategoryDonut data={categorySlices} />
          </div>
        </Card>
      </ChartsGrid>

      <Card>
        <CardTitle>Transações recentes</CardTitle>
        <div style={{ marginTop: 16 }}>
          <TransactionList
            transactions={recent}
            categories={categories}
            onEdit={handleEdit}
            onDelete={deleteTransaction}
          />
        </div>
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
