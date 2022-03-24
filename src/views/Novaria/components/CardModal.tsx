import React from "react";
import styled from "styled-components";
import { IconButton, Flex, CloseIcon, InjectedModalProps } from '@pancakeswap-libs/uikit'


interface Props extends InjectedModalProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
}

const StyledIconButton = styled(IconButton)`
  &:hover {
    background: transparent !important;
  }

`;

const StyledModal = styled.div`
  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  text-align: center;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
  bodyPadding = "24px",
  ...props
}) => (
  <StyledModal {...props} >
    <ModalHeader>
      {/* <ModalTitle>
        {onBack && (
          <StyledIconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
            <ArrowBackIcon color="#5affff" />
          </StyledIconButton>
        )}
        <Heading style={{color:'#5affff'}}>{title}</Heading>
      </ModalTitle> */}
      {!hideCloseButton && (
        <StyledIconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="#5affff" />
        </StyledIconButton>
      )}
    </ModalHeader>
    <Flex flexDirection="column" p={3} style={{color:'#5affff'}}>
      {children}
    </Flex>
  </StyledModal>
);

export default Modal;