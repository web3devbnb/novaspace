import React from 'react'
import styled, { keyframes } from 'styled-components'

const ImgWrap = styled.div`
    position: relative;
    background-image: url('/images/novaria/borderTLBR.png'), url('/images/novaria/borderTR.png'), url('/images/novaria/borderTLBR.png'), url('/images/novaria/borderBL.png');
    background-position: top 3px left 3px, top 5px right 10px, bottom 3px right 3px, bottom 5px left 10px;
    // background-size: 100% 100%;
    background-repeat: no-repeat;
    background-color: #00000080;
    
`

const borderAnimation = keyframes`
    from { background-position: 0 0, -80px 0, 100% -80px, 0 100%; }
    to { background-position: 0 -80px, 0 0, 100% 0, -80px 100%; }
`
const ChildWrapper = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 10px;
   
    border: 2px solid #a0bbd5;
    
    position: relative;

    // background-image: repeating-linear-gradient(240deg, #9e9e9e, #9e9e9e 25.2px, transparent 30px, transparent 38.4px, #9e9e9e 40px), repeating-linear-gradient(330deg, #9e9e9e, #9e9e9e 25.2px, transparent 30px, transparent 38.4px, #9e9e9e 40px), repeating-linear-gradient(60deg, #9e9e9e, #9e9e9e 25.2px, transparent 30px, transparent 38.4px, #9e9e9e 40px), repeating-linear-gradient(150deg, #9e9e9e, #9e9e9e 25.2px, transparent 30px, transparent 38.4px, #9e9e9e 40px);
    // background-size: 2px calc(100% + 80px), calc(100% + 80px) 2px, 2px calc(100% + 80px) , calc(100% + 80px) 2px;
    // background-position: 0 0, 0 0, 100% 0, 0 100%;
    // background-repeat: no-repeat;
    // animation: ${borderAnimation} 2s infinite linear reverse;
`




const BodyWrapper = ({children}) => {

    return (
       
        <ImgWrap>
            <ChildWrapper>
                
                  {children}
                
            </ChildWrapper>
        </ImgWrap>
       
    )
}

export default BodyWrapper
