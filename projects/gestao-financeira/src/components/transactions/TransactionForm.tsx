import { useState } from 'react'
import styled from 'styled-components'
import type { Category, Transaction, TransactionType } from '../../types'
import { Button } from '../ui/Button'
import { FieldGroup, FieldLabel, Input, Select } from '../ui/Field'
import { todayIso } from '../../lib/format'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(1)};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`

const TypeOption = styled.button<{ $active: boolean; $variant: TransactionType }>`
  padding: ${({ theme }) => theme.space(2.5)};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 700;
  font-size: 0.9rem;
  background: ${({ $active, $variant, theme }) =>
    $active
      ? $variant === 'income'
        ? `${theme.colors.income}22`
        : `${theme.colors.expense}22`
      : 'transparent'};
  color: ${({ $active, $variant, theme }) =>
    $active
      ? $variant === 'income'
        ? theme.colors.income
        : theme.colors.expense
      : theme.colors.textMuted};
  transition: background 0.2s ease, color 0.2s ease;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space(4)};

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(2)};
`

export type TransactionFormValues = Omit<Transaction, 'id' | 'createdAt'>

interface Props {
  categories: Category[]
  initialValues?: Transaction
  onSubmit: (values: TransactionFormValues) => void
  onCancel: () => void
}

export function TransactionForm({
  categories,
  initialValues,
  onSubmit,
  onCancel,
}: Props) {
  const [type, setType] = useState<TransactionType>(
    initialValues?.type ?? 'expense',
  )
  const [amount, setAmount] = useState(
    initialValues ? String(initialValues.amount) : '',
  )
  const [description, setDescription] = useState(
    initialValues?.description ?? '',
  )
  const [date, setDate] = useState(initialValues?.date ?? todayIso())
  const [recurrence, setRecurrence] = useState(
    initialValues?.recurrence ?? 'none',
  )

  const options = categories.filter((cat) => cat.type === type)
  const [categoryId, setCategoryId] = useState(
    initialValues?.categoryId ?? options[0]?.id ?? '',
  )

  const handleTypeChange = (nextType: TransactionType) => {
    setType(nextType)
    const nextOptions = categories.filter((cat) => cat.type === nextType)
    if (!nextOptions.some((cat) => cat.id === categoryId)) {
      setCategoryId(nextOptions[0]?.id ?? '')
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const parsedAmount = Number(amount.replace(',', '.'))
    if (!parsedAmount || parsedAmount <= 0 || !categoryId) return

    onSubmit({
      type,
      amount: parsedAmount,
      categoryId,
      description: description.trim() || 'Sem descrição',
      date,
      recurrence,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TypeToggle role="tablist">
        <TypeOption
          type="button"
          role="tab"
          aria-selected={type === 'expense'}
          $active={type === 'expense'}
          $variant="expense"
          onClick={() => handleTypeChange('expense')}
        >
          Despesa
        </TypeOption>
        <TypeOption
          type="button"
          role="tab"
          aria-selected={type === 'income'}
          $active={type === 'income'}
          $variant="income"
          onClick={() => handleTypeChange('income')}
        >
          Entrada
        </TypeOption>
      </TypeToggle>

      <Row>
        <FieldGroup>
          <FieldLabel>Valor (R$)</FieldLabel>
          <Input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            autoFocus
          />
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Data</FieldLabel>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FieldGroup>
      </Row>

      <FieldGroup>
        <FieldLabel>Descrição</FieldLabel>
        <Input
          type="text"
          placeholder="Ex.: Supermercado, salário..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={80}
        />
      </FieldGroup>

      <Row>
        <FieldGroup>
          <FieldLabel>Categoria</FieldLabel>
          <Select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            {options.length === 0 && <option value="">Sem categorias</option>}
            {options.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </Select>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Recorrência</FieldLabel>
          <Select
            value={recurrence}
            onChange={(e) =>
              setRecurrence(e.target.value as Transaction['recurrence'])
            }
          >
            <option value="none">Única</option>
            <option value="monthly">Mensal</option>
          </Select>
        </FieldGroup>
      </Row>

      <Actions>
        <Button type="button" $variant="ghost" $full onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" $full disabled={options.length === 0}>
          {initialValues ? 'Salvar' : 'Adicionar'}
        </Button>
      </Actions>
    </Form>
  )
}
