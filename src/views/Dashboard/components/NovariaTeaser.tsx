import React from 'react'
import styled from 'styled-components'
import VideoModal from './VideoModal'

const Body = styled.div`
  display: flex;
  justify-content: center;
  background-position: center;
  background-size: cover;
  background-image: url('/images/home/ytcover.jpg');
  height: 500px;
  width: 100%;
  border: 2px solid #00aaff;
  border-radius: 30px;
`

const NovariaTeaser = ({ title }: { title: string }) => {
  return (
    <Body id={title}>
      {/* <a href="/novaria">
            <Img src={NovariaLogo} alt="LEGEND OF NOVARIA" />
        </a> */}
      <VideoModal />
    </Body>
  )
}

export default NovariaTeaser
