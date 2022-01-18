import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import Bubbles from 'components/Bubbles'
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

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  useEagerConnect()
  useFetchPublicData()
  const isNovaria = window.location.pathname === './Novaria'
  return (
    <Router>
      <ResetCSS />
      
      <Menu style={{ backgroundColor:"black" }}>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
            <GlobalStyle isNovaria={false} />
              <Home />
            </Route>
            {/* <Route path="/dashboard">
              <Dashboard />
            </Route> */}
            <Route path="/traderoutes">
            <GlobalStyle isNovaria={false} />
              <Farms />
            </Route>
            {/* <Route path="/pools">
              <Farms tokenMode />
            </Route> */}
            <Route path="/novaria">
            <GlobalStyle isNovaria />
              <Novaria />
            </Route>
            <Route path="/privacy">
            <GlobalStyle isNovaria={false} />
              <Privacy />
            </Route>
            <Route path="/terms">
            <GlobalStyle isNovaria={false} />
              <Terms />
            </Route>
            <Route component={NotFound} />
            <GlobalStyle isNovaria={false} />
          </Switch>
          {/* <Bubbles numberOfBubbles={150} /> */}
        </Suspense>
      </Menu>
      <Footer />
    </Router>
  )
}

export default React.memo(App)
