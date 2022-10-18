import { useContext, useState } from "react"
import CONFIG from "../abi/config"
import { GlobalContext } from "../context/GlobalContext"
import StakeDetails from "./StakeDetails"
import StakeForm from "./StakeForm"
import LoadingSpinner from './LoadingSpinner'
import contractABI from './../abi/staking.json'
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const Main = ({ setError, setErrMsg }) => {
    const { blockChainData, account, updateRewardBalance } = useContext(GlobalContext)
    const [isLoading, setLoading] = useState(false)
    console.log(blockChainData)
    const plans = [
        {
            plan: 0,
            duration: '30 days',
            apy: blockChainData.apy.one_month_apy
        },
        {
            plan: 1,
            duration: '60 days',
            apy: blockChainData.apy.two_month_apy
        },
        {
            plan: 2,
            duration: '90 days',
            apy: blockChainData.apy.three_month_apy
        },
        {
            plan: 3,
            duration: '180 days',
            apy: blockChainData.apy.six_month_apy
        },
        {
            plan: 4,
            duration: '365 days',
            apy: blockChainData.apy.one_year_apy
        }
    ]
    const [plan, setPlan] = useState(plans[0])

    return (
        <>
            <div className="btn-grad-bg">
                <div className="container mx-auto md:max-w-5xl px-4 text-[color:var(--font-color)] mt-14 font-Poppins">
                    <div className="text-5xl font-bold py-4 text-center"><h1>DEGRAIN STAKING</h1></div>
                    <div className="stakeInfo w-full mb-8 z-10">
                        <div className="flex flex-col md:flex-row">
                            <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full py-4 px-8 items-center text-center justify-between">
                                <div className="mx-auto">
                                    <h2 className="font-extrabold text-2xl" style={{ textShadow: "0 0 0.01em #fff, 0 0 1em #fff" }}>{(blockChainData.TotalRewards) ? parseFloat(blockChainData.TotalRewards).toFixed(2) : '0.00'} {CONFIG.tokenSymbol}</h2>
                                    <p className="uppercase text-sm font-light">Total Claimed Rewards</p>
                                </div>
                            </div>
                            <div className="flex min-h-[8rem] bg-[color:var(--cards-bg)] w-full py-4 px-8 items-center text-center justify-between">
                                <div className="mx-auto">
                                    <h2 className="font-extrabold text-2xl" style={{ textShadow: "0 0 0.01em #fff, 0 0 1em #fff" }}>{(blockChainData.TotalStaked) ? parseFloat(blockChainData.TotalStaked).toFixed(2) : '0.00'} {CONFIG.tokenSymbol}</h2>
                                    <p className="uppercase text-sm font-light">Total Staked</p>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto md:max-w-5xl px-4 text-[color:var(--font-color)] font-Poppins">
                <div className="main flex items-center justify-center flex-wrap md:flex-nowrap">
                    <div className="w-full md:w-1/2 mb-8 z-10 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.6)]  ">
                        <div className="stakePanel bg-[color:var(--cards-bg)] p-6 w-full border border-[#555] rounded-xl">
                            <h3 className="uppercase font-semibold text-md font-Poppins text-left mb-5" style={{ textShadow: "0 0 0.17em #fff, 0 0 1.1em #fff" }}>Participate in Degrain Stake</h3>
                            {/* <h2 className="font-extrabold text-2xl ml-3 text-left text-[#b28760]">{(blockChainData.StakedBalance) ? parseFloat(blockChainData.StakedBalance) + parseFloat(blockChainData.StakedBalance1) + parseFloat(blockChainData.StakedBalance2) : '0.00'} {CONFIG.tokenSymbol}</h2>
                        <div className="font-Poppins mt-6 px-3 border-b-2 border-[color:var(--border-color)]">
                            <p className="font-normal text-left">Total Stake</p>
                        </div> */}
                            <StakeDetails plan={plan} plans={plans} setPlan={setPlan} />
                            <StakeForm setError={setError} setErrMsg={setErrMsg} plan={plan} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Main