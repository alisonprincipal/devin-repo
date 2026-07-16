import styled, { css } from 'styled-components'

type Variant = 'primary' | 'ghost' | 'danger' | 'subtle'

const variants = {
  primary: css`
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.accent}
    );
    color: #fff;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      box-shadow: ${({ theme }) => theme.colors.glow};
      transform: translateY(-1px);
    }
  `,
  subtle: css`
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    border: 1px solid ${({ theme }) => theme.colors.glassBorder};
    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.primary};
    }
  `,
  danger: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.danger};
    border: 1px solid ${({ theme }) => theme.colors.danger}55;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.danger}18;
    }
  `,
} satisfies Record<Variant, ReturnType<typeof css>>

export const Button = styled.button<{ $variant?: Variant; $full?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => `${theme.space(2.5)} ${theme.space(4)}`};
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
    border-color 0.2s ease, color 0.2s ease;
  width: ${({ $full }) => ($full ? '100%' : 'auto')};

  ${({ $variant = 'primary' }) => variants[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.glassBorder};
  color: ${({ theme }) => theme.colors.text};
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
