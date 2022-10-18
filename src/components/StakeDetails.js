import classNames from "classnames"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"

const StakeDetails = ({plan, plans, setPlan}) => {
    const { blockChainData, account } = useContext(GlobalContext)
    console.log(plan)

    const getStakedBalance = () => {
        return plan.plan === 0 ? parseFloat(blockChainData.StakeBalance.plan0).toFixed(2) :  plan.plan === 1 ? parseFloat(blockChainData.StakeBalance.plan1).toFixed(2) : plan.plan === 2 ? parseFloat(blockChainData.StakeBalance.plan2).toFixed(2) : plan.plan === 3 ? parseFloat(blockChainData.StakeBalance.plan3).toFixed(2) : plan.plan === 4 ? parseFloat(blockChainData.StakeBalance.plan4).toFixed(2) : 0.00
    }

    const getRewardsEarned = () => {
        return plan.plan === 0 ? parseFloat(blockChainData.RewardBalance.plan0).toFixed(2) :  plan.plan === 1 ? parseFloat(blockChainData.RewardBalance.plan1).toFixed(2) : plan.plan === 2 ? parseFloat(blockChainData.RewardBalance.plan2).toFixed(2) : plan.plan === 3 ? parseFloat(blockChainData.RewardBalance.plan3).toFixed(2) : plan.plan === 4 ? parseFloat(blockChainData.RewardBalance.plan4).toFixed(2) : 0.00
    }

    useEffect(()=>{
        setPlan(plans[0])
    }, [blockChainData.apy.one_month_apy, blockChainData.apy.two_month_apy, blockChainData.apy.three_month_apy, blockChainData.apy.six_month_apy, blockChainData.apy.one_year_apy])
    
    return (
        <>
            <div className="hidden md:flex py-6 items-start justify-items-start space-x-3 md:space-x-3 text-black">
                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 0})} onClick={()=> setPlan(plans[0])}>30 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 1})} onClick={()=> setPlan(plans[1])}>60 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 2})} onClick={()=> setPlan(plans[2])}>90 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 3})} onClick={()=> setPlan(plans[3])}>180 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 4})} onClick={()=> setPlan(plans[4])}>365 days</button>
            </div>

            <div className="flex md:hidden py-6 items-center justify-center space-x-3 md:space-x-3 text-black">
                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 0})} onClick={()=> setPlan(plans[0])}>30 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 1})} onClick={()=> setPlan(plans[1])}>60 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 2})} onClick={()=> setPlan(plans[2])}>90 days</button>
            </div>

            <div className="flex md:hidden pb-6 items-center justify-center space-x-3 md:space-x-3 text-black">
                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 3})} onClick={()=> setPlan(plans[3])}>180 days</button>

                <button className={classNames('truncate text-[#5d27c7] border border-[#5d27c7] rounded-lg text-sm px-3 py-1 transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {'text-[#ed329b] border-[#ed329b]': plan.plan === 4})} onClick={()=> setPlan(plans[4])}>365 days</button>
            </div>
            
            <div className="p-6 pt-1 flex items-center justify-center space-x-2 md:space-x-8 text-black">
            
            </div>
            <div className="uppercase font-bold border-b">Summary</div>
            <div className="flex items-start justify-between py-5 border-b mb-10">
                <div className="space-y-2 text-sm mr-4">
                    <p className="text-left">Lock period: {plan.duration}</p>
                    <p className="text-left">Re-locks on registration: Yes</p>
                    <p className="text-left">Status: Locked</p>
                    <p className="text-left">Stake Balance: {account ? getStakedBalance() : 0.00}</p>
                    <p className="text-left">Rewards earned: {account ? getRewardsEarned() : 0.00}</p>
                </div>
                <div className="text-center md:mr-6">
                    <h3 className="uppercase text-2xl font-bold">APY</h3>
                    <h1 className="font-bold text-4xl text-[#ed329b]" >{plan.apy && parseFloat(plan.apy.toString())/100}%</h1>
                </div>
            </div>
        </>
    )
}

export default StakeDetails