import React from 'react'
import styled from 'styled-components'
import Modal from '../components/CardModal'
import moleCard from '../assets/moleCard.png'
import viperCard from '../assets/viperCard.png'
import unknownCard from '../assets/newShipCard.png'
import gorianCard from '../assets/gorianCard.png'
import fireflyCard from '../assets/fireflyCard.png'

interface PlayerModalProps {
  shipclass: string
  onDismiss?: () => void
}

const Img = styled.img`
    margin-top: 20px;
    background-color: black;
    border-radius: 15px;

    ${({ theme }) => theme.mediaQueries.md} {
        min-width: 25%;
        margin-left: auto;
        margin-right: auto;
    }
`

const ShipCardModal: React.FC<PlayerModalProps> = ({ shipclass, onDismiss }) => {
  
    
  return (
    <Modal title={shipclass} onDismiss={onDismiss} >
      {shipclass === 'Viper' && <Img src={viperCard} alt='viper' />}
      {shipclass === 'P.U.P.' && <Img src={moleCard} alt='viper' />}
      {shipclass === 'Firefly' && <Img src={fireflyCard} alt='viper' />}
      {shipclass === 'Gorian' && <Img src={gorianCard} alt='viper' />}
      {shipclass === 'Unknown' && <Img src={unknownCard} alt='viper' />}        
    </Modal>
  )
}

export default ShipCardModal