import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceNovaBusd } from 'state/hooks'
import { Menu as UikitMenu, menuConfig as config } from '@pancakeswap-libs/uikit'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const novaPriceUsd = usePriceNovaBusd()

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      novaPriceUsd={novaPriceUsd.toNumber()}
      links={config}
      priceLink="https://dex.guru/token/0x56e344be9a7a7a1d27c854628483efd67c11214f-bsc"
      {...props}
    />
  )
}

export default Menu
