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
      max-width: 45%;
      margin: 0 8px;
    }
  }
`

export default FlexLayout
