import React from 'react'
import styled from 'styled-components'

const Body = styled.div`
    position: relative;
`

const HavenImageCard = styled.div`
  background-image: url('/images/novaria/haven.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: clamp(300px, 300px, 300px);
`
const PlanetImageCard = styled.div``
const PlanetInfoCard = styled.div`
 
`
 
const LocationCard = () => {

    return(
        <Body>
            <HavenImageCard />
        </Body>
    )
}
export default LocationCard