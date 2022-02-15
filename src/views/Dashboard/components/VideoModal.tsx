import React, { useState } from 'react'
import styled from 'styled-components'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/scss/modal-video.scss'
import PlayLogo from '../assets/play.png'

const Button = styled.button`
  cursor: pointer;
  align-self: center;
  padding: 1.5rem 1.25rem;
  font-family: sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: -2px 4px 4px #091243, 0 0 10px #00d0ff, inset 1px 1px 1px white;
  color: #1fffff;
  border: 2px solid;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6), 2px 1px 4px rgba(0, 0, 0, 0.3), 2px 4px 3px rgba(3, 0, 128, 0.3),
    0 0 7px 2px rgba(0, 208, 255, 0.6), inset 0 1px 2px rgba(0, 0, 0, 0.6), inset 2px 1px 4px rgba(0, 0, 0, 0.3),
    inset 2px 4px 3px rgba(3, 0, 128, 0.3), inset 0 0 7px 2px rgba(0, 208, 255, 0.6);
`

const Img = styled.img``

const Body = styled.div`
  align-self: center;
  z-index: 1;
`

const scrollToMiddle = () => window.scrollTo(50, document.body.scrollHeight / 2.5)

const VideoModal = () => {
  const [isOpen, setOpen] = useState(false)
    return (
      <Body>
        <div>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="VRH2LvKXKEQ"
            onClose={() => setOpen(false)}
          />
          <Button type="button" onClick={()=> {setOpen(true); scrollToMiddle()}} ><Img src={PlayLogo} alt="play" /></Button>
        </div>
      </Body>
    )
}

export default VideoModal
