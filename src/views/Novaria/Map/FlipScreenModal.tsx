import React, {useContext, createContext, useState} from 'react'
import styled from 'styled-components'
import NovariaModal from '../components/NovariaModal'

interface TakeoverModalProps {
    isMobile: boolean
    onDismiss?: () => void
  }


const Child = styled.div`
  margin-bottom: 5px;
  font-size: 12px;
`
const Wrapper = styled.div<{isOpen:boolean}>`
    display: ${(props) => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
`

const FlipScreenModal: React.FC<TakeoverModalProps> = ({ isMobile, onDismiss}) => {

    const [isOpen, setIsOpen] = useState(true)

    const handleDismiss = async () => {
        setIsOpen(false)
    }

    if (!isMobile) {
        return(null)
    }

    return (
        <Wrapper isOpen={isOpen} role='button' onClick={handleDismiss}>
          {isOpen &&  <NovariaModal title='Rotate Screen' onDismiss={onDismiss}>
            
                <Child>
                !!! Map works best in landscape view !!!
                </Child>
                
            </NovariaModal>}
        </Wrapper>
    )
}

export default FlipScreenModal
