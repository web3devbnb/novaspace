import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'

const HarvestButton = ({ children, disabled, ...rest }) => (
  <Button disabled={disabled} variant={disabled ? 'secondary' : 'primary'} {...rest} fullWidth>
    {children}
  </Button>
)

export default HarvestButton
 