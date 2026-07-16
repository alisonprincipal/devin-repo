import styled from 'styled-components'

export const Card = styled.div<{ $interactive?: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding: ${({ theme }) => theme.space(6)};
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

  ${({ $interactive, theme }) =>
    $interactive &&
    `
    cursor: pointer;
    &:hover {
      transform: translateY(-3px);
      border-color: ${theme.colors.primary};
      box-shadow: ${theme.colors.shadow}, ${theme.colors.glow};
    }
  `}
`

export const CardTitle = styled.h3`
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`
