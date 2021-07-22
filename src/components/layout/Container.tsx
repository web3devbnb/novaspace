import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 992px;
  padding-left: 8px;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 8px;
    padding-right: 8px;
  }
`

export default Container
