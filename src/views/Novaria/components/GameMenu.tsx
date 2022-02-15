import React, { useState } from 'react'
import styled from 'styled-components'
import overview from '../assets/overviewMenu.png'
import shipyard from '../assets/shipyardMenu.png'
import starmap from '../assets/starmapMenu.png'
import location from '../assets/locationMenu.png'
import flag from '../assets/menuFlag.png'

const Frame = styled.div`
  width: 140px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-top: 10px;
`

const SmallFrame = styled.div`
  width: 60px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  // margin-right: 5px;
  margin-top: 10px;
`

const Link = styled.a`
  padding: 6px 8px 6px 16px;
  link-decoration: none;
  font-size: 15px;
  color: #abc8e2;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`

const Icon = styled.img`
  height: 40px;
  width: auto;
  // margin-right: 2px;
`

const Flag = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  z-index: 0;
  position: absolute;
  left: 55px;
`

const Flag1 = styled.div`
  justify-content: center;
  padding-bottom: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 55px;
  opacity: 0;
  color: #5affff;
  z-index: 1;
  &:hover,
  &:focus,
  &:active {
    opacity: 1;
  }
`

const ToggleButton = styled.button`
  cursor: pointer;
  color: gray;
  background: transparent;
  border: none;
`

const GameMenu = ({ pageName }) => {
  const [open, setOpen] = useState(true)

  const toggleViewMenu = () => {
    if (open === true) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }

  return (
    <div>
      {open === true ? (
        <Frame>
          <ToggleButton type="button" onClick={toggleViewMenu}>
            {open === true ? '<<' : '>>'}
          </ToggleButton>
          <Link href="/overview">
            <Icon src={overview} alt="game overview" />
            <Flag1 aria-haspopup="true">
              OVERVIEW
              <img src={flag} alt="flag" />{' '}
            </Flag1>
            {pageName === 'overview' ? (
              <Flag>
                {' '}
                OVERVIEW <img src={flag} alt="flag" />{' '}
              </Flag>
            ) : (
              ''
            )}
          </Link>
          <Link href="/map">
            <Icon src={starmap} alt="game star map" />
            <Flag1 aria-haspopup="true">
              STAR MAP
              <img src={flag} alt="flag" />{' '}
            </Flag1>
            {pageName === 'starmap' ? (
              <Flag>
                STAR MAP
                <img src={flag} alt="flag" />{' '}
              </Flag>
            ) : (
              ''
            )}
          </Link>
          <Link href="/shipyard">
            <Icon src={shipyard} alt="game shipyard" />
            <Flag1 aria-haspopup="true">
              SHIPYARD
              <img src={flag} alt="flag" />{' '}
            </Flag1>
            {pageName === 'shipyard' ? (
              <Flag>
                SHIPYARD <img src={flag} alt="flag" />{' '}
              </Flag>
            ) : (
              ''
            )}
          </Link>
          <Link href="/location">
            <Icon src={location} alt="game location" />
            <Flag1 aria-haspopup="true">
              LOCATION
              <img src={flag} alt="flag" />{' '}
            </Flag1>
            {pageName === 'location' ? (
              <Flag>
                {' '}
                LOCATION
                <img src={flag} alt="flag" />{' '}
              </Flag>
            ) : (
              ''
            )}
          </Link>
        </Frame>
      ) : (
        <SmallFrame>
          <ToggleButton type="button" onClick={toggleViewMenu}>
            &gt;&gt;
          </ToggleButton>
          <Link href="/overview">
            <Icon src={overview} alt="game overview" />
          </Link>
          <Link href="/map">
            <Icon src={starmap} alt="game star map" />
          </Link>
          <Link href="/shipyard">
            <Icon src={shipyard} alt="game shipyard" />
          </Link>
          <Link href="/location">
            <Icon src={location} alt="game location" />
          </Link>
        </SmallFrame>
      )}
    </div>
  )
}
export default GameMenu
