import { Button } from '@pancakeswap-libs/uikit'
import React from 'react'
import styled from 'styled-components'

const Container = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`

const NeonButton = ({
    title,
    link,
  }: {
    title: string
    link: string
  }) => {
    return (
        <Container href={link} target='_blank' rel='noreferrer noopener'>
          <Button>
            {title}
          </Button>
        </Container>
    )
  }
  
  export default NeonButton