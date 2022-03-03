import React, {useState} from "react";
import styled from "styled-components";
import showCountdown from 'utils/countdownTimer'
import { useClaimShips } from "hooks/useNovaria";
import viperQueue from '../../assets/viperQueue.png'
import moleQueue from '../../assets/moleQueue.png'
import fireflyQueue from '../../assets/fireflyQueue.png'
import gorianQueue from '../../assets/gorianQueue.png'


const SpaceDockMenu = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  position: relative;

  border: 1px solid #8c8c8c;
  margin: 10px;
  padding: 10px;
  background-color: #00000080;
  
  max-width: 100%;
  min-height: 312px;

  overflow-x: scroll;
  scrollbar-color: #5affff #289794;
  scrollbar-width: thin;
  white-space: nowrap

  &::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    background-color: #289794;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0px;
    background-color: #5affff;
  }
`


const QueueCardImg = styled.img`
  position: absolute;
  margin-top: -10px;
  z-index: -1;
`

const QueueCardItems = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: .75rem;
  margin-top: 95%;
  width: 110px;
  margin-left:10px;
`

const QueueCard = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ClaimControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 5px;
`

const ClaimInput = styled.input`
  width: 3em;
  padding: 2px;
  background: transparent;
  border: 1px solid #5affff;
  color: #5affff;
`

const ClaimButton = styled.button`
  cursor: pointer;
  margin: 5px;
  align-self: center;
  padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  border: none;
  border-radius: 0px;
  background-color: #5affff;
`

const CountdownButton = styled.button`
  margin: 5px;
  margin-left: 0px;
  align-self: center;
  // padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 0.75rem;
  width: 125px;
  text-decoration: none;
  color: #8c8c8c;
  border: 1px solid #8c8c8c;
  border-radius: 0px;
  background-color: transparent;
`

const WrongLocationButton = styled.button`
  margin: 5px;
  align-self: center;
  padding: 0.25rem 1rem;
  font-family: sans-serif;
  font-size: 0.75rem;

  text-decoration: none;
  color: #5affff;
  border: 1px solid #5affff;
  border-radius: 0px;
  background-color: transparent;
`

const Col = styled.div`
  flex-direction: column;
  margin: 10px;
  display: flex;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  align-items: center;
  width: 100%;
`


const Item = styled.div``


const BuildQueue = ({dock, fleetLocation}) => {
    const [pending, setPendingTx] = useState(false)
    const [claimAmount, setClaimAmount] = useState(null)

    

    const { onClaim } = useClaimShips()

    const handleClaim = async (claimId) => {
        setPendingTx(true)
        console.log('claimId, claimAmount', typeof claimId, claimId, typeof claimAmount, claimAmount)
        try {
            await onClaim(claimId, claimAmount)
        } catch (error) {
            // console.log('error: ', error)
        } finally {
            setPendingTx(false)
        }
    }
    const handleClaimMax = async (claimId, amount) => {
        setPendingTx(true)
        console.log('claimId, claimAmount', typeof claimId, claimId, typeof claimAmount, claimAmount)
        try {
            await onClaim(claimId, amount)
        } catch (error) {
            // console.log('error: ', error)
        } finally {
            setPendingTx(false)
        }
    }

    return(
        <Col >
            <QueueCard key={dock.shipClassId}>
                {dock.shipClassId === '0' && <QueueCardImg src={viperQueue} alt="vipers in queue" />}
                {dock.shipClassId === '1' && <QueueCardImg src={moleQueue} alt="moles in queue" />}
                {dock.shipClassId === '2' && <QueueCardImg src={fireflyQueue} alt="fireflys in queue" />}
                {dock.shipClassId === '3' && <QueueCardImg src={gorianQueue} alt="gorians in queue" />}

                <QueueCardItems>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Item>LOCATION &nbsp;</Item>
                    <br />
                    <br />
                    <Item style={{ zIndex: 1 }}>
                    ({dock.coordX}, {dock.coordY})
                    </Item>
                </Row>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Item>AMOUNT</Item>
                    <Item style={{ zIndex: 1 }}>{dock.amount}</Item>
                </Row>
                </QueueCardItems>
            </QueueCard>

            <ClaimControls>
                {/* eslint-disable-next-line no-nested-ternary */}
                {fleetLocation.X === dock.coordX && fleetLocation.Y === dock.coordY ? (
                +new Date(dock.completionTime * 1000) - +new Date() < 0 ? (
                    <div>
                    <Row>
                        <ClaimButton
                        style={{
                            margin: 0,
                            marginBottom: -2,
                            marginRight: 5,
                            padding: 3,
                            fontSize: 13,
                            width: '100%',
                        }}
                        onClick={() => handleClaimMax(Number(dock), dock.amount)}
                        >
                        {!pending ? 'CLAIM MAX' : 'pending...'}
                        </ClaimButton>
                    </Row>
                    <Item>
                        <ClaimInput
                        type="number"
                        min="0"
                        placeholder="0"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(parseFloat(e.target.value))}
                        />
                        <ClaimButton onClick={() => handleClaim(Number(dock))}>
                        {!pending ? 'CLAIM' : 'pending...'}
                        </ClaimButton>
                    </Item>
                    </div>
                ) : (
                    ''
                )
                ) : (
                <WrongLocationButton>Not at Shipyard</WrongLocationButton>
                )}
                {dock.completionTime * 1000 > Number(new Date()) ? (
                <CountdownButton>{showCountdown(new Date(dock.completionTime * 1000))}</CountdownButton>
                ) : (
                ''
                )}
            </ClaimControls>
            </Col>
    )
}
export default BuildQueue