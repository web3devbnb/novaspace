import React from "react";
import styled from "styled-components";
import { IconButton, Heading, Flex, ArrowBackIcon, CloseIcon, InjectedModalProps } from '@pancakeswap-libs/uikit'


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
  background-image: url('/images/novaria/modalBG.png');
  background-size: 100% 100%;
  box-shadow: 0px 20px 36px -8px rgba(0, 0, 0, 0.9), 0px 1px 1px rgba(0, 0, 0, 0.5);

  width: 100%;
  z-index: ${({ theme }) => theme.zIndices.modal};
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: 360px;
    max-width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 50vw;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  align-items: center;
`;

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
  color: #5affff;
  padding: 10px;
  padding-top: 30px;
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
      <ModalTitle>
        {onBack && (
          <StyledIconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
            <ArrowBackIcon color="#5affff" />
          </StyledIconButton>
        )}
        <Heading style={{color:'#5affff'}}>{title}</Heading>
      </ModalTitle>
      {!hideCloseButton && (
        <StyledIconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
          <CloseIcon color="#5affff" />
        </StyledIconButton>
      )}
    </ModalHeader>
    <Flex flexDirection="column" p={3} style={{color:'#5affff', paddingTop:50}}>
      {children}
    </Flex>
  </StyledModal>
);

export default Modal;
