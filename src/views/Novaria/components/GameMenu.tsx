import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Heading, Tag } from '@pancakeswap-libs/uikit'

const Frame = styled.div`
    width: 130px;
    position: fixed;
    z-index: 1;
    top: 120px;
    left: 10px;
    background: #00000080;
    overflow-x: hidden;
    padding: 8px 0;
`

const Link = styled.a`
    padding: 6px 8px 6px 16px;
    Link-decoration: none;
    font-size: 20px;
    color: #2196F3;
    display: block;
    &:hover {
        color: #064579;
    }

`

const GameMenu = () => (

    <Frame>
       <Link href="/overview" > Overview</Link>
       <Link href="/map"> Map</Link>
       <Link href="/shipyard"> Shipyard</Link>
       <Link href="/location"> Location</Link>
    </Frame>

)

export default GameMenu