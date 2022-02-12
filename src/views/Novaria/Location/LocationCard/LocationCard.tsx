import React from 'react'
import styled from 'styled-components'

const Body = styled.div`
    position: relative;
    margin: 15px;
    width: 300px;
    height: 450px;
`

const HavenImageCard = styled.div`
  background-image: url('/images/novaria/haven.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(270px, 280px, 290px);
  ${({ theme }) => theme.mediaQueries.md} {
    width: clamp(300px, 300px, 300px);
  }
`

const PlanetImageCard = styled.div`
    background-image: url('/images/novaria/haven.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: clamp(270px, 280px, 290px);
    ${({ theme }) => theme.mediaQueries.md} {
        width: clamp(300px, 300px, 300px);
    }
`

const EmptyImageCard = styled.div`
    background-image: url('/images/novaria/empty.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: clamp(270px, 280px, 290px);
    ${({ theme }) => theme.mediaQueries.md} {
        width: clamp(300px, 300px, 300px);
    }
`

const PlaceHeader = styled.div`
    position: absolute;
    top: 230px;
    left: 14px;
    width: 255px;
    display: flex;
    flex-wrap: no-wrap;
    flex-direction: column;
`

const Name = styled.div`
    font-weight: bold;
    font-size: 18px;
`

const Location = styled.div`
    font-weight: bold;
    text-align: right;
`

const PlaceBody = styled.div`
    position: absolute;
    top: 330px;
    left: 10px;
    width: 260px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
`

const Button = styled.button`
    border: 1px solid #5affff;
    background: transparent;
    color: #5affff;
    width: 110px;
    margin: 5px;
    &:hover {
        background-color: #5affff;
        color: black
    }
`

const Row = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`
 
const LocationCard = ({placename, placetype, mineral, salvage, shipyard, refinery, placeX, placeY}) => {

    // const HandleTravel = () =>{

    // }


    return(
        <Body>
            <HavenImageCard />
            <PlaceHeader>
                <Row>
                    <Name>
                        {placename}
                    </Name>
                    <Location>
                        ({placeX},{placeY})
                    </Location>
                </Row>
                <Row style={{fontSize: 12, marginTop: 3}}>
                    <span>
                        {shipyard === true ? 'SHIPYARD' : ''}
                    </span>
                    <span>
                        {refinery === true ? 'REFINERY' : ''}
                    </span>
                    <span>
                        {salvage > 0 ? salvage : ''}{salvage > 0 ? 'SALVAGE' : ''}
                    </span>
                    <span>
                        {mineral > 0 ? mineral : ''}{mineral > 0 ? 'MINERAL' : ''}
                    </span>
                </Row>
            </PlaceHeader>
            <PlaceBody>
                <Button type='button' >MINE</Button>
                <Button type='button' >COLLECT</Button>
                <Button type='button' >TRAVEL</Button>
                <Button type='button' >REFINE</Button>
            </PlaceBody>
        </Body>
    )
}
export default LocationCard