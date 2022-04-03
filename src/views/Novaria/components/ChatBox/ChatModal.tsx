import React from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import MSGApp from './Chatter2'

interface ChatModalProps {
  playerName: any
  playerExists: any
  onDismiss?: () => void
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 10px;
  max-width: 300px;
  max-height: 500px;
  border: 1px solid #5affff;
`

const ChatModal: React.FC<ChatModalProps> = ({ playerName, playerExists, onDismiss }) => {
  return (
    <Modal onDismiss={onDismiss}>
      <Wrapper>
        <MSGApp playerExists={playerExists} username={playerName} />
      </Wrapper>
    </Modal>
  )
}

export default ChatModal
