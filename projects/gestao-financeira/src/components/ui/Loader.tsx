import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to { transform: rotate(360deg); }
`

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 40vh;
`

const Spinner = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.glassBorder};
  border-top-color: ${({ theme }) => theme.colors.primary};
  animation: ${spin} 0.8s linear infinite;
`

export function Loader() {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}
