import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'
import './bubbles.scss'

export const ConnectedAccountContext = React.createContext(null)

const WalletProvider = ({ children }) => {
  const wallet = useWallet()

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
        <Text fontSize="3rem">Please, connect your wallet.</Text>
      </Page>
    )
  }

  return <ConnectedAccountContext.Provider value={wallet.account}>{children}</ConnectedAccountContext.Provider>
}

// Route-based code splitting
const Home = lazy(() => import('./views/Dashboard'))
const Farms = lazy(() => import('./views/Farms'))
const Novaria = lazy(() => import('./views/Novaria'))
// const Dashboard = lazy(() => import('./views/Dashboard'))
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

      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Home />
              <Footer />
            </Route>
            <Route path="/traderoutes">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Farms />
              <Footer />
            </Route>
            {/* <Route path="/pools">
              <Farms tokenMode />
            </Route> */}
            <Route path="/novaria">
              <GlobalStyle isNovaria isShipyard={false} isNovariaSpace={false} isStandard={false} />
              <Novaria />
              <Footer />
            </Route>

            <Route path="/map">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace isStandard={false} />
              <Map />
            </Route>
            <Route path="/location">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace isStandard={false} />
              <WalletProvider>
                <Location />
              </WalletProvider>
            </Route>
            <Route path="/overview">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace isStandard={false} />
              <Overview />
            </Route>
            <Route path="/shipyard">
              <GlobalStyle isNovaria={false} isShipyard isNovariaSpace={false} isStandard={false} />
              <Shipyard />
            </Route>

            <Route path="/privacy">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Privacy />
              <Footer />
            </Route>
            <Route path="/terms">
              <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
              <Terms />
              <Footer />
            </Route>
            <Route component={NotFound} />
            <GlobalStyle isNovaria={false} isShipyard={false} isNovariaSpace={false} isStandard />
          </Switch>
          {/* <Bubbles numberOfBubbles={150} /> */}
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
