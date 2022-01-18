import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    width: 100%;
    margin-bottom: 32px;
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 25%;
      margin: 0 8px 16px;
    }
    ${({ theme }) => theme.mediaQueries.md} {
      max-width: 20%;
    }
  }
`

export default FlexLayout
