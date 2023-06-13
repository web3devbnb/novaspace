import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Dashboard',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
    icon: 'TradeIcon',
    href: '/swap',
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },

  {
    label: 'Socials',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Telegram',
        icon: 'TelegramIcon',
        href: 'https://t.me/ShibaNovaDEX',
      },
      {
        label: 'Twitter',
        icon: 'TwitterIcon',
        href: 'https://twitter.com/ShibaNovaDefi',
      },
      {
        label: 'Medium',
        icon: 'MediumIcon',
        href: 'https://shibanova.medium.com/',
      },
      {
        label: 'Github',
        icon: 'GithubIcon',
        href: 'https://github.com/ShibaNova',
      },
      {
        label: 'Docs',
        icon: 'BookIcon',
        href: 'https://docs.NovaSpace.io ',
      },
    ],
  },
]

export default config
