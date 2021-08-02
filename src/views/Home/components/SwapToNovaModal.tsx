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
}

const StyledModal = styled(Modal)`
  max-width: 560px;
`

const SwapToNovaModal: React.FC<SwapToNovaModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
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
    }
    setPendingTx(false)
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

      <ModalActions>
        <Button
          variant={!disableConfirmButton ? 'primary' : 'secondary'}
          disabled={disableConfirmButton}
          onClick={sendTx}
        >
          {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
        </Button>
        <Button variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
      </ModalActions>
    </StyledModal>
  )
}

export default SwapToNovaModal
