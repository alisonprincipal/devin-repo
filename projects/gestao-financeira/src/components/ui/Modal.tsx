import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled, { keyframes } from 'styled-components'
import { IconButton } from './Button'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space(4)};
  background: rgba(3, 6, 18, 0.6);
  backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.2s ease;
`

const Panel = styled.div`
  width: min(520px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(24px);
  padding: ${({ theme }) => theme.space(6)};
  animation: ${slideUp} 0.25s ease;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space(5)};
`

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
`

interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <Overlay onClick={onClose}>
      <Panel role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{title}</Title>
          <IconButton aria-label="Fechar" onClick={onClose}>
            ✕
          </IconButton>
        </Header>
        {children}
      </Panel>
    </Overlay>,
    document.body,
  )
}
