import React from 'react'
import styled from 'styled-components'
import { IconButton, Flex, CloseIcon, InjectedModalProps } from '@pancakeswap-libs/uikit'

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: transparent !important;
  }
`

const StyledModal = styled.div`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  text-align: center;
`

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

interface Props extends InjectedModalProps {
  hideCloseButton?: boolean
  onDismiss?: () => void
}

const Modal: React.FC<Props> = ({ onDismiss, children, hideCloseButton = false, ...props }) => (
  <StyledModal {...props}>
    <ModalHeader>
      {!hideCloseButton && (
        <StyledIconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="#5affff" />
        </StyledIconButton>
      )}
    </ModalHeader>
    <Flex flexDirection="column" p={3} style={{ color: '#5affff' }}>
      {children}
    </Flex>
  </StyledModal>
)

export default Modal
