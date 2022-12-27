const {ethers} = require("hardhat");
//const hre =require("@nomiclabs/hardhat-ethers");


async function main() {
    // const BooToken = await ethers.getContractFactory("BooToken")
    // const booToken = await BooToken.deploy()
    // await booToken.deployed()

    // console.log(`deploy to bootoken ${booToken.address}`)
    // //Life Token

    // const LifeToken = await ethers.getContractFactory("LifeToken")
    // const lifeToken = await LifeToken.deploy()
    // await lifeToken.deployed()
    // console.log(`deploy to Lifetoken ${lifeToken.address}`)

    //SingleSwap Token

    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken")
    const singleSwapToken = await SingleSwapToken.deploy()
    await singleSwapToken.deployed()
    console.log(`deploy to SingleSwapToken ${singleSwapToken.address}`)

    //SingleSwap Token

    // const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop")
    // const swapMultiHop = await SwapMultiHop.deploy()
    // await swapMultiHop.deployed()
    // console.log(`deploy to SwapMultiHop ${swapMultiHop.address}`)

}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1

})
