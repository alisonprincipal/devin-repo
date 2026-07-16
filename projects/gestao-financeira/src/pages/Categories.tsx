import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useFinanceStore } from '../store/useFinanceStore'
import type { Category } from '../types'
import { Page, SectionHeader } from '../components/ui/Section'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { EmptyState } from '../components/ui/EmptyState'
import {
  CategoryForm,
  type CategoryFormValues,
} from '../components/categories/CategoryForm'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.space(3)};
`

const Tile = styled(Card)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(4)};
`

const Icon = styled.span<{ $color: string }>`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $color }) => $color}22;
  border: 1px solid ${({ $color }) => $color}55;
  font-size: 1.25rem;
`

const Info = styled.div`
  min-width: 0;
  strong {
    display: block;
    font-size: 0.95rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

const Controls = styled.div`
  margin-left: auto;
  display: flex;
  gap: 2px;
`

const MiniButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.radii.sm};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }
`

const GroupLabel = styled.h3`
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.space(3)};
`

export function Categories() {
  const {
    categories,
    transactions,
    addCategory,
    updateCategory,
    deleteCategory,
  } = useFinanceStore()

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<Category | null>(null)

  const usageCount = useMemo(() => {
    const counts = new Map<string, number>()
    for (const tx of transactions) {
      counts.set(tx.categoryId, (counts.get(tx.categoryId) ?? 0) + 1)
    }
    return counts
  }, [transactions])

  const income = categories.filter((cat) => cat.type === 'income')
  const expense = categories.filter((cat) => cat.type === 'expense')

  const closeForm = () => {
    setFormOpen(false)
    setEditing(null)
  }

  const handleSubmit = (values: CategoryFormValues) => {
    if (editing) updateCategory(editing.id, values)
    else addCategory(values)
    closeForm()
  }

  const renderTile = (cat: Category) => {
    const count = usageCount.get(cat.id) ?? 0
    return (
      <Tile key={cat.id}>
        <Icon $color={cat.color}>{cat.icon}</Icon>
        <Info>
          <strong>{cat.name}</strong>
          <span>
            {count} {count === 1 ? 'lançamento' : 'lançamentos'}
          </span>
        </Info>
        <Controls>
          <MiniButton
            aria-label="Editar categoria"
            onClick={() => {
              setEditing(cat)
              setFormOpen(true)
            }}
          >
            ✎
          </MiniButton>
          <MiniButton
            aria-label="Excluir categoria"
            onClick={() => setConfirmDelete(cat)}
          >
            🗑
          </MiniButton>
        </Controls>
      </Tile>
    )
  }

  return (
    <Page>
      <SectionHeader>
        <div>
          <h2>Categorias</h2>
          <p>Organize suas entradas e despesas por categoria.</p>
        </div>
        <Button onClick={() => setFormOpen(true)}>+ Nova categoria</Button>
      </SectionHeader>

      {categories.length === 0 ? (
        <Card>
          <EmptyState
            icon="🏷️"
            title="Nenhuma categoria"
            description="Crie categorias para classificar suas transações."
          />
        </Card>
      ) : (
        <>
          <section>
            <GroupLabel>Entradas</GroupLabel>
            <Grid>{income.map(renderTile)}</Grid>
          </section>
          <section>
            <GroupLabel>Despesas</GroupLabel>
            <Grid>{expense.map(renderTile)}</Grid>
          </section>
        </>
      )}

      {formOpen && (
        <Modal
          title={editing ? 'Editar categoria' : 'Nova categoria'}
          onClose={closeForm}
        >
          <CategoryForm
            initialValues={editing ?? undefined}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {confirmDelete && (
        <Modal
          title="Excluir categoria"
          onClose={() => setConfirmDelete(null)}
        >
          <p style={{ lineHeight: 1.6 }}>
            Tem certeza que deseja excluir <strong>{confirmDelete.name}</strong>?
            {(usageCount.get(confirmDelete.id) ?? 0) > 0 && (
              <>
                {' '}
                As <strong>{usageCount.get(confirmDelete.id)} transações</strong>{' '}
                vinculadas também serão removidas.
              </>
            )}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Button
              $variant="ghost"
              $full
              onClick={() => setConfirmDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              $variant="danger"
              $full
              onClick={() => {
                deleteCategory(confirmDelete.id)
                setConfirmDelete(null)
              }}
            >
              Excluir
            </Button>
          </div>
        </Modal>
      )}
    </Page>
  )
}
