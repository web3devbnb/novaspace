import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import useEagerConnect from 'hooks/useEagerConnect'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import Footer from './components/Footer'
import './bubbles.scss'

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
              <GlobalStyle isNovaria={false} />
              <Home />
              <Footer />
            </Route>
            <Route path="/traderoutes">
              <GlobalStyle isNovaria={false} />
              <Farms />
              <Footer />
            </Route>
            {/* <Route path="/pools">
              <Farms tokenMode />
            </Route> */}
            <Route path="/novaria">
              <GlobalStyle isNovaria />
              <Novaria />
              <Footer />
            </Route>

            <Route path="/map">
              <GlobalStyle isNovaria />
              <Map />
            </Route>
            <Route path="/location">
              <GlobalStyle isNovaria />
              <Location />
            </Route>
            <Route path="/overview">
              <GlobalStyle isNovaria />
              <Overview />
            </Route>
            <Route path="/shipyard">
              <GlobalStyle isNovaria />
              <Shipyard />
            </Route>

            <Route path="/privacy">
              <GlobalStyle isNovaria={false} />
              <Privacy />
              <Footer />
            </Route>
            <Route path="/terms">
              <GlobalStyle isNovaria={false} />
              <Terms />
              <Footer />
            </Route>
            <Route component={NotFound} />
            <GlobalStyle isNovaria={false} />
          </Switch>
          {/* <Bubbles numberOfBubbles={150} /> */}
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
