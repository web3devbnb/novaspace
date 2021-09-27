import React from 'react';
import Carousel from 'nuka-carousel';
import styled from 'styled-components'
import Banner1 from './Banner1'
import Banner2 from './Banner2'

// const [autoplay, setAutoplay] = useState(false);

const Wrapper = styled.div`
  // border: 2px solid ${({ theme }) => theme.colors.primary};
  height: 300px;
  width: 98%;
  border-radius: 30px;
  position: relative;
  margin: 15px 0;
`

const Img = styled.img`
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  width: 98%;
  height: 300px;
`

const Banner = () => {
    return (
      <Wrapper>
        <Carousel
        // eslint-disable-next-line react/jsx-boolean-value
        autoplay={true}
        autoplayInterval={8000} 
        // eslint-disable-next-line react/jsx-boolean-value
        wrapAround={true}
        // eslint-disable-next-line react/jsx-boolean-value
        withoutControls={true}
        >
          <Banner1 />
          <Banner2 />
         
        </Carousel>
      </Wrapper>
    )
  }

export default Banner