import { useState } from 'react'
import styled from 'styled-components'
import type { Category, TransactionType } from '../../types'
import { Button } from '../ui/Button'
import { FieldGroup, FieldLabel, Input, Select } from '../ui/Field'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space(4)};
`

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};

  input[type='color'] {
    width: 52px;
    height: 44px;
    padding: 2px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    background: ${({ theme }) => theme.colors.surfaceAlt};
    cursor: pointer;
  }
`

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(2)};
`

const emojiOptions = [
  '💼', '🧑‍💻', '📈', '🍔', '🏠', '🚗', '🎮', '💊', '🛍️',
  '✈️', '📚', '🎁', '☕', '🐾', '💡', '📱', '🏋️', '💰',
]

export type CategoryFormValues = Omit<Category, 'id'>

interface Props {
  initialValues?: Category
  onSubmit: (values: CategoryFormValues) => void
  onCancel: () => void
}

export function CategoryForm({ initialValues, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initialValues?.name ?? '')
  const [type, setType] = useState<TransactionType>(
    initialValues?.type ?? 'expense',
  )
  const [color, setColor] = useState(initialValues?.color ?? '#7c7bff')
  const [icon, setIcon] = useState(initialValues?.icon ?? '💰')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), type, color, icon })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldLabel>Nome</FieldLabel>
        <Input
          type="text"
          placeholder="Ex.: Educação"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          required
          autoFocus
        />
      </FieldGroup>

      <Row>
        <FieldGroup>
          <FieldLabel>Tipo</FieldLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionType)}
          >
            <option value="expense">Despesa</option>
            <option value="income">Entrada</option>
          </Select>
        </FieldGroup>

        <FieldGroup>
          <FieldLabel>Ícone</FieldLabel>
          <Select value={icon} onChange={(e) => setIcon(e.target.value)}>
            {emojiOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldGroup>
      </Row>

      <FieldGroup>
        <FieldLabel>Cor</FieldLabel>
        <ColorRow>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            maxLength={7}
          />
        </ColorRow>
      </FieldGroup>

      <Actions>
        <Button type="button" $variant="ghost" $full onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" $full>
          {initialValues ? 'Salvar' : 'Criar categoria'}
        </Button>
      </Actions>
    </Form>
  )
}
