import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS, Text, Button, useWalletModal } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'

export const ConnectedAccountContext = React.createContext<string | null>(null)

const WalletProvider = ({ children }) => {
  const wallet = useWallet()
  const {connect, reset} = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)

  if (wallet.status === 'connecting') {
    return <PageLoader />
  }

  if (
    wallet.status === 'disconnected' ||
    wallet.status === 'error' ||
    (wallet.status === 'connected' && wallet.account === null)
  ) {
    if (wallet.error) {
      console.log(wallet.error)
    }
    return (
      <Page style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={onPresentConnectModal}>Please Connect Wallet</Button>
      </Page>
    )
  }

  return <ConnectedAccountContext.Provider value={wallet.account}>{children}</ConnectedAccountContext.Provider>
}

// Route-based code splitting
const Home = lazy(() => import('./views/Dashboard'))
const Farms = lazy(() => import('./views/Farms'))
const Novaria = lazy(() => import('./views/Novaria'))
const NotFound = lazy(() => import('./views/NotFound'))
const Privacy = lazy(() => import('./views/Privacy'))
const Terms = lazy(() => import('./views/Terms'))
const Map = lazy(() => import('./views/Novaria/Map'))
const Location = lazy(() => import('./views/Novaria/Location'))
const Shipyard = lazy(() => import('./views/Novaria/Shipyard'))
const Overview = lazy(() => import('./views/Novaria/Overview'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  useFetchPublicData()
  return (
    <Router>
      <ResetCSS />

      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <Menu>
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Home />
              <Footer />
            </Menu>
          </Route>
          <Route path="/traderoutes">
            <Menu>
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Farms />
              <Footer />
            </Menu>
          </Route>
          <Route path="/legend-of-novaria">
            <Menu>
              <GlobalStyle isNovaria isShipyard={false} isNovariaSpace={false} isStandard={false} />
              
                <Novaria />
                <Footer />
            </Menu>
          </Route>
          <Route path="/map">
            <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace isStandard={false} />
            <WalletProvider>
              <Map />
            </WalletProvider>
          </Route>
          <Route path="/location">
            <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace isStandard={false} />
            <WalletProvider>
              <Location />
            </WalletProvider>
          </Route>
          <Route path="/overview">
            <GlobalStyle isNovaria={false} isShipyard isNovariaSpace={false} isStandard={false} />
            <WalletProvider>
              <Overview />
            </WalletProvider>
          </Route>
          <Route path="/shipyard">
            <GlobalStyle isNovaria={false} isShipyard isNovariaSpace={false} isStandard={false} />
            <WalletProvider>
              <Shipyard />
            </WalletProvider>
          </Route>

          <Route path="/privacy">
            <Menu>
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Privacy />
              <Footer />
            </Menu>
          </Route>
          <Route path="/terms">
            <Menu>
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Terms />
              <Footer />
            </Menu>
          </Route>
          <Route component={NotFound} />
          <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default React.memo(App)
