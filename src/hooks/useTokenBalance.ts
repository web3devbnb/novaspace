import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import cakeABI from 'config/abi/cake.json'
import sNovaABI from 'config/abi/snova.json'
import moneypotABI from 'config/abi/moneypot.json'
import { getContract } from 'utils/web3'
import { getTokenBalance } from 'utils/erc20'
import { getCakeAddress, getSNovaAddress, getMoneyPotAddress, getBusdAddress, getWbnbAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account)
      setBalance(new BigNumber(res))
    }

    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, tokenAddress, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const cakeContract = getContract(cakeABI, getCakeAddress())
      const bal = await cakeContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useSNovaTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const supply = await sNovaContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useSNovaBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const bal = await sNovaContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(bal))
    }

    fetchBalance()
  }, [tokenAddress, slowRefresh])

  return balance
}

export const useMoneyPotBNBReward = () => {
  const { slowRefresh } = useRefresh()
  const [moneyPotBNBReward, setMoneyPotBNBReward] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  const bnbAddress = getWbnbAddress()
  let user

  if (account === null || account ===  undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchMoneyPotBNBReward() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const reward = await moneyPotContract.methods.pendingTokenRewardsAmount(bnbAddress, user).call()
      setMoneyPotBNBReward(new BigNumber(reward))
    }

    fetchMoneyPotBNBReward()
  }, [bnbAddress, user, slowRefresh])

  return moneyPotBNBReward
}

export const useMoneyPotBUSDReward = () => {
  const { slowRefresh } = useRefresh()
  const [moneyPotBUSDReward, setMoneyPotBUSDReward] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  const busdAddress = getBusdAddress()
  let user

  if (account === null || account ===  undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchMoneyPotBUSDReward() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const reward = await moneyPotContract.methods.pendingTokenRewardsAmount(busdAddress, user).call()
      setMoneyPotBUSDReward(new BigNumber(reward))
    }

    fetchMoneyPotBUSDReward()
  }, [busdAddress, user, slowRefresh])

  return moneyPotBUSDReward
}

export const useSNovaPenalty = () => {
  const { slowRefresh } = useRefresh()
  const [SNovaPenalty, setSNovaPenalty] = useState<BigNumber>()
  const { account }: { account: string } = useWallet()
  let user

  if (account === null || account ===  undefined || account === '') {
    user = '0x0000000000000000000000000000000000000000'
  } else {
    user = account
  }

  useEffect(() => {
    async function fetchSNovaPenalty() {
      const sNovaContract = getContract(sNovaABI, getSNovaAddress())
      const reward = await sNovaContract.methods.getPenaltyPercent(user).call()
      setSNovaPenalty(new BigNumber(reward))
    }

    fetchSNovaPenalty()
  }, [user, slowRefresh])

  return SNovaPenalty
}

export const useDistributedMoneyPotBUSD = () => {
  const { slowRefresh } = useRefresh()
  const [distributedMoneyPotBUSD, setDistributedMoneyPotBUSD] = useState<Array<any>>([])
  const busdAddress = getBusdAddress()

  useEffect(() => {
    async function fetchMoneyPotDistributedMoneyPotBUSD() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const disMoneyPotBusd = await moneyPotContract.methods.distributedMoneyPot(busdAddress).call()
      setDistributedMoneyPotBUSD(disMoneyPotBusd)
    }

    fetchMoneyPotDistributedMoneyPotBUSD()
  }, [busdAddress, slowRefresh])

  return distributedMoneyPotBUSD
}

export const useDistributedMoneyPotBNB = () => {
  const { slowRefresh } = useRefresh()
  const [distributedMoneyPotWBNB, setDistributedMoneyPotWBNB] = useState<Array<any>>([])
  const wbnbAddress = getWbnbAddress()

  useEffect(() => {
    async function fetchMoneyPotDistributedMoneyPotBUSD() {
      const moneyPotContract = getContract(moneypotABI, getMoneyPotAddress())
      const disMoneyPotWbnb = await moneyPotContract.methods.distributedMoneyPot(wbnbAddress).call()
      setDistributedMoneyPotWBNB(disMoneyPotWbnb)
    }

    fetchMoneyPotDistributedMoneyPotBUSD()
  }, [wbnbAddress, slowRefresh])

  return distributedMoneyPotWBNB
}

export default useTokenBalance
