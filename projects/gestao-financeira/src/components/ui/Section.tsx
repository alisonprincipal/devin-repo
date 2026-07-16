import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(6)};
  animation: ${fadeUp} 0.35s ease;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  flex-wrap: wrap;

  h2 {
    font-size: 1.15rem;
    font-weight: 700;
  }

  p {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`

export const Grid = styled.div<{ $cols?: string }>`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols ?? '1fr 1fr'};
  gap: ${({ theme }) => theme.space(4)};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`
