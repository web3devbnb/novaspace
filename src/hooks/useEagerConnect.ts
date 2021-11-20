import { useEffect } from 'react'
import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

const useEagerConnect = () => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (account) {
      return
    }

    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => connect(connectorId))

        return
      }

      connect(connectorId)
    }
  }, [account, connect])
}

export default useEagerConnect
