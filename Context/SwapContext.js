// deploy to bootoken 0x7A28cf37763279F774916b85b5ef8b64AB421f79
// deploy to Lifetoken 0x2BB8B93F585B43b06F3d523bf30C203d3B6d4BD4
// deploy to SingleSwapToken 0xB7ca895F81F20e05A5eb11B05Cbaab3DAe5e23cd
// deploy to SwapMultiHop 0xd0EC100F1252a53322051a95CF05c32f0C174354

import React, { useState, useEffect } from 'react'
import Web3Modal from 'web3modal'
import { ethers, BigNumber, Contract } from 'ethers'

import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core'
import { getPrice } from '../Utils/fatchingPrice'
import { swapUpdatePrice } from '../Utils/swapUpdatePrice'

import {
    connectWallet,
    connectingWithLifeToken,
    connectingWithBooToken,
    connectingWithSingalSwapToken,
    connectingWithSwapMultiToken,
    connectingDAIToken,
    connectingIWthToken,
    checkIfWalletConnected

} from '../Utils/appFeatures'

import { WIETHABI } from './constants'
import ERC20 from './ERC20.json'
//import { constants } from 'buffer'


export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
    // const swap = "welcome to swap my token"

    //use state
    const [account, setAccount] = useState('')
    const [ether, setEther] = useState('')
    const [networkConnect, setNetworkConnect] = useState('')
    const [weth9, setWeth9] = useState('')
    const [dai, setDai] = useState('')
    const [tokenData, setTokenData] = useState([])

    const addToken = [
        "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        // "0x7A28cf37763279F774916b85b5ef8b64AB421f79",
        // "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9",
        "0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc",
        "0x68749665FF8D2d112Fa859AA293F07A622782F38",
        "0xe3c408BD53c31C085a1746AF401A4042954ff740"
    ]

    //fatching data
    const fatchingData = async () => {
        try {
            //user Account 
            const userAccount = await checkIfWalletConnected();
            setAccount(userAccount)
            // console.log("User Account---------", userAccount)

            //create provider

            const web3modal = new Web3Modal()
            const connection = await web3modal.connect();
            // console.log("Connection", connection)
            const provider = new ethers.providers.Web3Provider(connection)
            // console.log("provider", provider)
            //check balance
            const balance = await provider.getBalance(userAccount)
            const convertBal = BigNumber.from(balance).toString()
            const ethVal = ethers.utils.formatEther(convertBal)
            setEther(ethVal)

            // console.log("balance of : ", ethVal)

            //network name
            const network = await provider.getNetwork()
            setNetworkConnect(network.name)
            // console.log("Network : ",network)

            // ALL token  balance of Data
            addToken.map(async (el, i) => {
                const contract = new ethers.Contract(el, ERC20, provider)
                // console.log("Contract Address---------------", contract)
                // get balance of token
                const userBalance = await contract.balanceOf(userAccount)
                const token = BigNumber.from(userBalance).toString()
                const converttokenBal = ethers.utils.formatEther(token)

                // console.log("contract balance :", converttokenBal)

                // get name and symbol
                const name = await contract.name()
                const symbol = await contract.symbol()
                tokenData.push({
                    name: name,
                    symbol: symbol,
                    tokenBalance: converttokenBal,
                    tokenAdress:el
                })

            })

            //Weth balance
            const wethContract = await connectingIWthToken()
            const wethBal = await wethContract.balanceOf(userAccount)
            const wethtoken = BigNumber.from(wethBal).toString()
            const convertwethtokenBal = ethers.utils.formatEther(wethtoken)
            setWeth9(convertwethtokenBal)

            //dai balance
            const daiContract = await connectingDAIToken()
            const daiBal = await daiContract.balanceOf(userAccount)
            const daitoken = BigNumber.from(daiBal).toString()
            const convertdaitokenBal = ethers.utils.formatEther(daitoken)
            setDai(convertdaitokenBal)

            console.log("Dai Balance----", dai)
            console.log("Weth9 Balance----", weth9)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fatchingData()
    }, [])

    const singleSwapToken = async (token1, token2, swapAmount) => {
       // console.log(token0.token.address.token.address,token2.token.address.token.address, swapAmount)
        try {
            let singleSwapToken;
            let weth;
            let dai;
            singleSwapToken = await connectingWithSingalSwapToken()

            weth = await connectingIWthToken();
            dai = await connectingDAIToken();


            //const amountIn = 10n ** 18n
            const decimals0 = 18;
            const inputAmount = swapAmount
            const amountIn = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
            console.log(amountIn)



            console.log(weth)
            await weth.deposit({ value: amountIn })
            await weth.approve(singleSwapToken.address, amountIn)

            //swap
            const transcation = await singleSwapToken.swapExactInputSingle(
                token1.token.address.token.address,
                token2.token.address.token.address,
                amountIn,
                {
                    gasLimit: 300000
                })

            await transcation.wait()
            console.log(transcation)

            const balance = await dai.balanceOf(account)
            const transferAmount = BigNumber.from(balance).toString()
            const ethVal = ethers.utils.formatEther(transferAmount)
            setDai(ethVal)

            console.log("Dai Balance : ", ethVal)




        } catch (error) {
            console.log(error)
        }

    }    // useEffect(()=>{
    //     singleSwapToken()

    // },[])
    // useEffect(()=>{
    //     singleSwapToken()

    // },[])

    return (
        <SwapTokenContext.Provider value={{ account, ether, 
        networkConnect, dai, weth9, tokenData, 
        connectWallet, singleSwapToken,getPrice,swapUpdatePrice }}>
            {children}
        </SwapTokenContext.Provider>
    )
}