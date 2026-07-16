import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(10)} ${({ theme }) => theme.space(4)};
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};

  .icon {
    font-size: 2.4rem;
    opacity: 0.7;
  }

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
  }

  p {
    font-size: 0.88rem;
    max-width: 320px;
  }
`

interface Props {
  icon?: string
  title: string
  description?: string
  children?: React.ReactNode
}

export function EmptyState({ icon = '🗂️', title, description, children }: Props) {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <strong>{title}</strong>
      {description && <p>{description}</p>}
      {children}
    </Wrapper>
  )
}
