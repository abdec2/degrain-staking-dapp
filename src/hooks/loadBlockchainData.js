import { ethers } from "ethers";
import { useContext, useEffect } from "react"
import CONFIG from "../abi/config";
import { GlobalContext } from "../context/GlobalContext"
import stakeABI from '../abi/staking.json'

export const useBlockChainData = (setDataLoading) => {
    const { updateTotalRewards, updateTotalStaked, updateApy } = useContext(GlobalContext)

    const loadData = async () => {
        setDataLoading(true)
        const provider = ethers.getDefaultProvider('goerli', {
            infura: process.env.REACT_APP_INFURA_PROJECT_ID
        });
        const contract = new ethers.Contract(CONFIG.contractAddress, stakeABI, provider)
        const totalStake = await contract.totalStake()
        const totalReward = await contract.totalRewards()
        const one_month_apy = await contract.apr(0)
        const two_month_apy = await contract.apr(1)
        const three_month_apy = await contract.apr(2)
        const six_month_apy = await contract.apr(3)
        const one_year_apy = await contract.apr(4)
        updateTotalRewards(ethers.utils.formatUnits(totalReward, CONFIG.tokenDecimals))
        updateTotalStaked(ethers.utils.formatUnits(totalStake, CONFIG.tokenDecimals))
        updateApy({
            one_month_apy,
            two_month_apy,
            three_month_apy,
            six_month_apy,
            one_year_apy
        })
        setDataLoading(false)
    }
    useEffect(() => {
        loadData()

    }, [])
}
