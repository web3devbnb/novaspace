import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import {io} from 'socket.io-client'

const socket = io('https://novaria-rankings.shibanova.io', {
    autoConnect: false
})

const Wrapper = styled.div`
    border: 1px solid #5affff;
    background: #00000099;
    padding: 5px;
`

const Header = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  text-align: center;
`

const LabelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  color: #289794;
  font-size: 12px;
  margin-bottom: 5px;
`

const RankRow = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    font-size: .8rem;
        
    ${({ theme }) => theme.mediaQueries.md} {
       font-size: 1rem;
    }
`

const NumberSpan = styled.span`
    text-align: right;
`

const ScrollSection = styled.div`
    overflow-y: auto;
    scrollbar-color: #5affff #289794;
    scrollbar-width: thin;
    max-height: 500px;

    &::-webkit-scrollbar {
    width: 5px;
    background-color: #289794;
    }
    &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
    }

`

const GameRankings = ({exp, playerName, playerSize, playerAttack, playerTotalMineral}) => {
    const [rankings, setRankings] = useState([])
    const [rankingsByExp, setRankingsByExp] = useState([])

    
  
    useEffect (() => {
        
        socket.connect()
        socket.on('connect', () => {
            console.log(`socket connected: ${socket.connected}`)
        })
    }, [])


    useEffect(() => {
        const userData = {
            name: playerName,
            size: playerSize,
            attack: playerAttack,
            experience: exp,
            totalMineral: playerTotalMineral
        }
        if (playerName !== '') {
            socket.emit('send_rankings', userData)
            console.log(`sent user data: ${userData}`)
        }
    }, [playerName, exp, playerAttack, playerSize, playerTotalMineral])

    useEffect(() => {
        socket.on('receive_rankings', (data) => {
            setRankings(data)
            setRankingsByExp(data.sort((a, b) =>
                (a.experience > b.experience ? -1 : 1)
                )
            )
        })
    }, [])

    return (
        <Wrapper>
            <Header>Player Rankings</Header>
            <LabelRow>
                <span>Name</span>
                <span>Size</span>
                <span>Attack</span>
                <span>Experience</span>
                <span>Total Refined</span>
            </LabelRow>
            <ScrollSection>
                {rankingsByExp.map((ranking) => {
                    return (
                        <RankRow>
                            <span>{ranking.name}</span>
                            <NumberSpan>{ranking.size}</NumberSpan>
                            <NumberSpan>{ranking.attack}</NumberSpan>
                            <NumberSpan>{ranking.experience}</NumberSpan>
                            <NumberSpan>{ranking.totalMineral}</NumberSpan>
                        </RankRow>
                    )
                })}
            </ScrollSection>
        </Wrapper>
    )
}
export default GameRankings