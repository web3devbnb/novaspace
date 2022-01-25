import React from 'react'
import styled from 'styled-components'

const Container = styled.a`
    // display: inline;
    margin: 10px;
    padding: .5rem 1.25rem;
    font-family: sans-serif;
    font-size: 1.25rem;
    text-decoration: none;
    text-shadow:
    -2px 4px 4px #091243, 
    0 0 10px #00D0FF,
    inset 1px 1px 1px white;
    color: #1FFFFF;
    border: 2px solid;
    border-radius: 4px;
    background-color: transparent;
    box-shadow: 
    0 1px 2px rgba(0,0,0, 0.6), 
    2px 1px 4px rgba(0,0,0, 0.3), 
    2px 4px 3px rgba(3,0,128, 0.3), 
    0 0 7px 2px rgba(0,208,255, 0.6), 
    inset 0 1px 2px rgba(0,0,0, 0.6), 
    inset 2px 1px 4px rgba(0,0,0, 0.3), 
    inset 2px 4px 3px rgba(3,0,128, 0.3), 
    inset 0 0 7px 2px rgba(0,208,255, 0.6);
   // animation: flickering 0.1s infinite;
`

const NeonButton = ({
    title,
    link,
  }: {
    title: string
    link: string
  }) => {
    return (
        <Container href={link}>
          {title}
        </Container>
    )
  }
  
  export default NeonButton