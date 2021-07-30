import { usePriceNovaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalNova = getBalanceNumber(totalRewards)
  const novaPriceBusd = usePriceNovaBusd()

  return totalNova * novaPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
