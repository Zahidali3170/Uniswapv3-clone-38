import { ethers } from "ethers";
import web3Modal from "web3modal"

import {BooTokenAddress, BooTokenABI,
     LifeTokenAddress,LifeTokenABI,
    SingleSwapTokenAddress,SingleSwapTokenABI,
    SwapMultiHopAddress,SwapMultiHopABI,WIETHAddess,WIETHABI
}from "../Context/constants";

//CHECK WALLET IS CONNECTED

export const checkIfWalletConnected = async()=>{
    try{
        if(!window.ethereum) return console.log("Install Metamask Wallet")
        const accounts= await window.ethereum.request({
            method: 'eth_accounts'
        })
        const firstAccount = accounts[0]
        return firstAccount

    }catch(error){
        console.error(" error")

    }

}
export const connectWallet = async()=>{
    try{
        if(!window.ethereum) return console.log("Install Metamask Wallet")
        const accounts= await window.ethereum.request({
            method: 'eth_requestAccounts'
        })
        const firstAccount = accounts[0]
        return firstAccount

    }catch(error){
        console.error(" error")

    }

}
// fatch Boo contract-----------------------------------
export const fatchBooContract= (signersOrProvider)=> new ethers.Contract(BooTokenAddress,BooTokenABI,
    signersOrProvider)

// connecting with Boo token

export const connectingWithBooToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchBooContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}

/////////////Fatch Life Contract///////////////
export const fatchLifeContract= (signersOrProvider)=> new ethers.Contract(LifeTokenAddress,LifeTokenABI,
    signersOrProvider)

// connecting with Life token

export const connectingWithLifeToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchLifeContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}

/////////////Fatch Singal Swap Contract///////////////
export const fatchSingalSwapContract= (signersOrProvider)=> new ethers.Contract(SingleSwapTokenAddress,SingleSwapTokenABI,
    signersOrProvider)

// connecting with Singal Swap token

export const connectingWithSingalSwapToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchSingalSwapContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}
/////////fatchSwapMultiContract///////////////////
export const fatchSwapMultiContract= (signersOrProvider)=> new ethers.Contract(SwapMultiHopAddress,SwapMultiHopABI,
    signersOrProvider)

// connecting with Swap Multi Hop token

export const connectingWithSwapMultiToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchSwapMultiContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}
/////////fatch IWTH Contract///////////////////
export const fatchIWthContract= (signersOrProvider)=> new ethers.Contract(WIETHAddess,WIETHABI,
    signersOrProvider)

// connecting with IWTH token

export const connectingIWthToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchIWthContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}

////////fatch IWTH Contract///////////////////
const DAIAddress= "0x6B175474E89094C44Da98b954EedeAC495271d0F"
export const fatchDAIContract= (signersOrProvider)=> new ethers.Contract(DAIAddress,WIETHABI,
    signersOrProvider)

// connecting with IWTH token

export const connectingDAIToken = async()=>{
    try{
        const web3modal= new web3Modal()
        const connection = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signers= provider.getSigner()
        const contract= fatchDAIContract(signers)
        return contract;

    }catch(error){
        console.error(" error")

    }
}