import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://swap.shibanova.com/',
      },
      {
        label: 'Liquidity',
        href: 'https://swap.shibanova.com/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Nests',
    icon: 'PoolIcon',
    href: '/nests',
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: '/nft',
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'PancakeSwap',
        href: 'https://pancakeswap.info/token/0xF952Fc3ca7325Cc27D15885d37117676d25BfdA6',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/goose-finance',
      },
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/goose-finance/',
      },
      {
        label: 'AstroTools',
        href: 'https://app.astrotools.io/pancake-pair-explorer/0x19e7cbecdd23a16dfa5573df54d98f7caae03019',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/shibanova/',
      },
      {
        label: 'Docs',
        href: 'https://docs.shibanova.com/',
      },
      {
        label: 'Blog',
        href: 'https://shibanova.medium.com/',
      },
    ],
  },

  {
    label: 'Audit by CTDSEC',
    icon: 'AuditIcon',
    href: 'https://ctdsec.com/',
  },
  {
    label: 'Audit by Ether Authority',
    icon: 'AuditIcon',
    href: 'https://etherauthority.io/shibanova-smart-contracts-audit/',
  },
  {
    label: 'Audit by Peckshield',
    icon: 'AuditIcon',
    href: 'https://',
  },
]

export default config
