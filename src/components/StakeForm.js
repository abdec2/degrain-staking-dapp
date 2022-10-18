import classNames from 'classnames'
import { useContext, useRef, useState } from 'react'
import * as yup from 'yup'
import CONFIG from '../abi/config'
import { GlobalContext } from '../context/GlobalContext'
import tokenABI from './../abi/token.json'
import contractABI from './../abi/staking.json'
import { ethers } from "ethers";
import LoadingScreen from './LoadingScreen'

const schema = yup.object().shape({
    amount: yup.number().required()
})

const StakeForm = ({ setError, setErrMsg, plan }) => {
    const [approve, setApprove] = useState(false)
    const amount = useRef()
    const [balance, setBalance] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [Withdraw, setWithdraw] = useState(false)
    const { account, blockChainData, web3Provider, fetchAccountData } = useContext(GlobalContext)

    const handleApprove = () => {
        const tokens = amount.current.value
        schema.isValid({
            amount: tokens
        }).then(async value => {
            if (value) {
                if (account) {
                    if (parseFloat(tokens) <= parseFloat(blockChainData.TokenBalance)) {
                        try {
                            setLoading(true)
                            const signer = web3Provider.getSigner();
                            const tokenContract = new ethers.Contract(CONFIG.tokenAddress, tokenABI, signer)
                            const estimateGas = await tokenContract.estimateGas.approve(CONFIG.contractAddress, ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals))
                            console.log(estimateGas.toString())
                            const tx = {
                                gasLimit: estimateGas.toString()
                            }
                            const approveTx = await tokenContract.approve(CONFIG.contractAddress, ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals), tx)
                            await approveTx.wait()
                            setApprove(true)
                            console.log(approveTx)
                            setLoading(false)
                        } catch (e) {
                            setLoading(false)
                        }
                    } else {
                        setError(true)
                        setErrMsg('Unsufficient Amount')
                    }


                } else {
                    setError(true)
                    setErrMsg('Please connect your wallet')
                }
            }
        })
        setLoading(false)
    }

    const checkAllowance = async () => {
        try {
            const signer = web3Provider.getSigner();
            const contract = new ethers.Contract(CONFIG.tokenAddress, tokenABI, signer);
            const allowance = await contract.allowance(account, CONFIG.contractAddress);

            return parseFloat(ethers.utils.formatEther(allowance.toString())) >= parseFloat(blockChainData.TokenBalance)
        } catch (e) {
            setLoading(false)
        }
    }

    const handleStake = () => {
        const tokens = amount.current.value
        schema.isValid({
            amount: tokens
        }).then(async value => {
            if (value) {
                if (account) {
                    if (parseFloat(tokens) <= parseFloat(blockChainData.TokenBalance)) {
                        try {
                            setLoading(true)
                            if (checkAllowance()) {
                                const signer = web3Provider.getSigner();
                                const contract = new ethers.Contract(CONFIG.contractAddress, contractABI, signer)
                                const estimateGas = await contract.estimateGas.createStake(ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals), plan.plan)
                                console.log(estimateGas.toString())
                                const tx = {
                                    gasLimit: estimateGas.toString()
                                }
                                const stakeTx = await contract.createStake(ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals), plan.plan, tx)
                                await stakeTx.wait()
                                setApprove(false)
                                console.log(stakeTx)
                                fetchAccountData(web3Provider)
                                setLoading(false)
                            } else {
                                setError(true)
                                setErrMsg('Please approve before staking...')
                            }

                        } catch (e) {
                            setLoading(false)
                        }

                    } else {
                        setError(true)
                        setErrMsg('Unsufficient Amount')
                    }

                } else {
                    setError(true)
                    setErrMsg('Please connect your wallet')
                }
            }
        })
        setLoading(false)
    }

    const handleWithdraw = () => {
        const tokens = amount.current.value
        schema.isValid({
            amount: tokens
        }).then(async value => {
            if (value) {
                if (account) {
                    const _staking_Balance = (plan.plan == 0) ? blockChainData.StakeBalance.plan0 : (plan.plan == 1) ? blockChainData.StakeBalance.plan1 : (plan.plan == 2) ? blockChainData.StakeBalance.plan2 : (plan.plan == 3) ? blockChainData.StakeBalance.plan3 : (plan.plan == 4) ? blockChainData.StakeBalance.plan4 : 0
                    if (parseFloat(tokens) <= parseFloat(_staking_Balance)) {
                        try {
                            setLoading(true)
                            setWithdraw(true)
                            const signer = web3Provider.getSigner();
                            const address = await signer.getAddress();
                            const contract = new ethers.Contract(CONFIG.contractAddress, contractABI, signer)
                            const estimateGas = await contract.estimateGas.unStake(ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals), plan.plan)
                            console.log(estimateGas.toString())
                            const tx = {
                                gasLimit: estimateGas.toString()
                            }
                            const removeStakeTx = await contract.unStake(ethers.utils.parseUnits(tokens.toString(), CONFIG.tokenDecimals), plan.plan, tx)
                            await removeStakeTx.wait()
                            setApprove(false)
                            console.log(removeStakeTx)
                            fetchAccountData(web3Provider)
                            setLoading(false)
                            setWithdraw(false)
                        } catch (e) {
                            setLoading(false)
                            setWithdraw(false)
                        }
                    } else {
                        setError(true)
                        setErrMsg('Unsufficient Amount')
                    }

                } else {
                    setError(true)
                    setErrMsg('Please connect your wallet')
                }
            }
        })
        setLoading(false)
        setWithdraw(false)
    }

    const handleMax = () => {
        amount.current.value = blockChainData.TokenBalance
    }

    return (
        <>
            <LoadingScreen dataLoading={isLoading} />
            <div className=" mt-2 mb-4">
                <div>
                    <div className="w-full flex items-center justify-between">
                        <div className='w-full relative'>
                            <input type="text" name="amount" className="w-full bg-transparent border border-[color:var(--border-color)] text-md focus:outline-none px-2 py-3 rounded-lg" ref={amount} />
                            <span className='absolute top-0 right-0 mr-3 mt-3 cursor-pointer hover:text-yellow-500' onClick={handleMax}>Max</span>
                            <p><span className='text-[#ed329b]'>Available DGRN:</span> {blockChainData.TokenBalance ? parseFloat(blockChainData.TokenBalance).toFixed(3) : 0.00}</p>
                        </div>

                    </div>
                </div>
                <div className="mt-8 flex items-center justify-center space-x-5" >
                    <button disabled={isLoading} className={classNames('text-white px-4 py-2 text-sm border border-white min-w-[100px] truncate rounded-lg transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {})} onClick={handleApprove}>Approve</button>

                    <button disabled={isLoading} className={classNames('text-white px-4 py-2 text-sm border border-white min-w-[100px] truncate rounded-lg transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {})} onClick={handleStake}>Stake</button>

                    <button disabled={isLoading} className={classNames('text-white px-4 py-2 text-sm border border-white min-w-[100px] truncate rounded-lg transition ease-in-out duration-300 hover:text-[#ed329b] hover:border-[#ed329b]', {})} onClick={handleWithdraw}>Unstake</button>

                </div>
                <div className='mt-8 text-sm font-light italic'>Note: Kindly approve before staking DEGRAIN</div>
            </div>
        </>
    )
}

export default StakeForm