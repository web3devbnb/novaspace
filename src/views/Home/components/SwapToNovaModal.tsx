import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState, useEffect } from 'react'

import { Button, Modal, Text } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'

interface SwapToNovaModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  penalty: string
}

const StyledModal = styled(Modal)`
  max-width: 560px;
`

const SwapToNovaModal: React.FC<SwapToNovaModalProps> = ({ onConfirm, onDismiss, max, penalty, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = (e) => {
    setVal(e.target.validity.valid ? e.target.value : val)
  }

  const sendTx = async () => {
    setPendingTx(true)
    try {
      await onConfirm(val)
      onDismiss()
    } catch (e) {
      console.log(e)
    } finally {
      setPendingTx(false)
    }
  }

  const handleSelectMax = () => {
    setVal(fullBalance)
  }

  const disableConfirmButton = pendingTx || Number(fullBalance) < Number(val) || Number(val) === 0

  return (
    <StyledModal title={`Swap ${tokenName} to Nova`} onDismiss={onDismiss}>
      <Text>
        Harvested sNova has a 3-day vesting period with a scaling swap penalty starting at 30%. Actual Nova received is
        reduced by penalty %.
      </Text>
      <TokenInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
      />
      {
        /* eslint-disable */
        val.length > 0 ? (
          Number(fullBalance) < Number(val) ? (
            <Text style={{ textAlign: 'right', fontSize: 14, color: '#ff2525' }}>Insufficient NOVA balance</Text>
          ) : (
            <Text style={{ textAlign: 'right', fontSize: 14 }}>
              You&apos;ll receive <b>~{Number(val) * ((100 - Number(penalty)) / 100)}</b> NOVA tokens.{' '}
              {Number(penalty) > 0 ? <span style={{ color: '#ff2525' }}>(-{penalty}%)</span> : null}
            </Text>
          )
        ) : null
      }

      <ModalActions>
        <Button variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
        <Button
          variant={!disableConfirmButton ? 'primary' : 'secondary'}
          disabled={disableConfirmButton}
          onClick={sendTx}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
      </ModalActions>
    </StyledModal>
  )
}

export default SwapToNovaModal
