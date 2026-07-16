import { useRef, useState } from 'react'
import styled from 'styled-components'
import { useFinanceStore } from '../store/useFinanceStore'
import { useThemeStore } from '../store/useThemeStore'
import { parseImportedData } from '../lib/storage'
import { Page, SectionHeader } from '../components/ui/Section'
import { Card, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

const Setting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space(4)};

  .text {
    max-width: 420px;
    strong {
      display: block;
      font-size: 0.95rem;
      margin-bottom: 2px;
    }
    span {
      font-size: 0.84rem;
      color: ${({ theme }) => theme.colors.textMuted};
    }
  }
`

const Feedback = styled.p<{ $error?: boolean }>`
  margin-top: ${({ theme }) => theme.space(3)};
  font-size: 0.84rem;
  color: ${({ $error, theme }) =>
    $error ? theme.colors.danger : theme.colors.success};
`

const ModeSwitch = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => theme.space(1)};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.md};
`

const ModeButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => `${theme.space(2)} ${theme.space(3.5)}`};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-weight: 600;
  font-size: 0.85rem;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primarySoft : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.textMuted};
`

export function Settings() {
  const { transactions, categories, importData, resetData } = useFinanceStore()
  const { mode, setMode } = useThemeStore()
  const fileInput = useRef<HTMLInputElement>(null)
  const [feedback, setFeedback] = useState<{ msg: string; error: boolean } | null>(
    null,
  )
  const [confirmReset, setConfirmReset] = useState(false)

  const handleExport = () => {
    const blob = new Blob(
      [JSON.stringify({ transactions, categories }, null, 2)],
      { type: 'application/json' },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `gestao-financeira-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setFeedback({ msg: 'Dados exportados com sucesso.', error: false })
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const text = await file.text()
      const data = parseImportedData(text)
      importData(data)
      setFeedback({ msg: 'Dados importados com sucesso.', error: false })
    } catch (error) {
      setFeedback({
        msg: error instanceof Error ? error.message : 'Falha ao importar.',
        error: true,
      })
    } finally {
      event.target.value = ''
    }
  }

  return (
    <Page>
      <SectionHeader>
        <div>
          <h2>Configurações</h2>
          <p>Aparência e gerenciamento dos seus dados.</p>
        </div>
      </SectionHeader>

      <Card>
        <CardTitle>Aparência</CardTitle>
        <Setting>
          <div className="text">
            <strong>Tema</strong>
            <span>Escolha entre modo claro ou escuro. A preferência é salva.</span>
          </div>
          <ModeSwitch>
            <ModeButton $active={mode === 'dark'} onClick={() => setMode('dark')}>
              🌙 Escuro
            </ModeButton>
            <ModeButton
              $active={mode === 'light'}
              onClick={() => setMode('light')}
            >
              ☀️ Claro
            </ModeButton>
          </ModeSwitch>
        </Setting>
      </Card>

      <Card>
        <CardTitle>Meus dados</CardTitle>
        <Stack>
          <Setting>
            <div className="text">
              <strong>Exportar</strong>
              <span>
                Baixe um arquivo JSON com todas as suas transações e categorias.
              </span>
            </div>
            <Button $variant="subtle" onClick={handleExport}>
              ⬇ Exportar JSON
            </Button>
          </Setting>

          <Setting>
            <div className="text">
              <strong>Importar</strong>
              <span>
                Restaure seus dados a partir de um arquivo JSON exportado.
              </span>
            </div>
            <Button $variant="subtle" onClick={() => fileInput.current?.click()}>
              ⬆ Importar JSON
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept="application/json"
              hidden
              onChange={handleImport}
            />
          </Setting>

          <Setting>
            <div className="text">
              <strong>Restaurar dados de exemplo</strong>
              <span>
                Remove seus dados atuais e recarrega o conjunto de exemplo.
              </span>
            </div>
            <Button $variant="danger" onClick={() => setConfirmReset(true)}>
              Restaurar
            </Button>
          </Setting>
        </Stack>

        {feedback && (
          <Feedback $error={feedback.error}>{feedback.msg}</Feedback>
        )}
      </Card>

      {confirmReset && (
        <Modal title="Restaurar dados" onClose={() => setConfirmReset(false)}>
          <p style={{ lineHeight: 1.6 }}>
            Isso irá <strong>apagar todos os seus dados</strong> e recarregar o
            conjunto de exemplo. Deseja continuar?
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Button $variant="ghost" $full onClick={() => setConfirmReset(false)}>
              Cancelar
            </Button>
            <Button
              $variant="danger"
              $full
              onClick={() => {
                resetData()
                setConfirmReset(false)
                setFeedback({ msg: 'Dados de exemplo restaurados.', error: false })
              }}
            >
              Restaurar
            </Button>
          </div>
        </Modal>
      )}
    </Page>
  )
}
