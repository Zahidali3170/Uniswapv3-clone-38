//const { SwapRouter, NonfungiblePositionManager } = require('@uniswap/v3-sdk')
const { Contract, ContractFactory, utils, BigNumber } = require('ethers')
//const { factory } = require('typescript')
//const { ethers } = require('hardhat')
//const { factory } = require('typescript')

const WETH9 = require('../Context/WETH9.json')

const artifacts = {
    UniswapV3Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
    SwapRouter: require('@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'),
    NFTDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json'),
    NonfungibleTokenPositionDescriptor: require('@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json'),
    NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
    WETH9,
}


//allow byte code of contraction this labrary
const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
    console.log("linkReferences : ", linkReferences)
    Object.keys(linkReferences).forEach((fileName) => {
        Object.keys(linkReferences[fileName]).forEach((contractName) => {
            if (!libraries.hasOwnProperty(contractName)) {
                throw new Error(`Missing link library name ${contractName}`)
            }
            const address = utils.getAddress(libraries[contractName]).toLowerCase().slice(2)

            linkReferences[fileName][contractName].forEach(({ start, lenght }) => {
                const start2 = 2 + start * 2
                const lenght2 = lenght * 2

                bytecode = bytecode.slice(0, start2).concat(address).concat(bytecode.slice(start2 + lenght2, bytecode.lenght))
            })
        })
    })
    //console.log("1111111111")
    return bytecode
}
async function main() {
    const [owner] = await ethers.getSigners()

    Weth = new ContractFactory(
        artifacts.WETH9.abi,
        artifacts.WETH9.bytecode,
        owner
    );
    // console.log("WETH9.abi : ", WETH9.abi)
    // console.log("WETH9.bytecode : ", WETH9.bytecode)
    //  console.log("owner : ", owner)
    weth = await Weth.deploy()

    //  console.log("weth deploy : ", weth)

    Factory = new ContractFactory(
        artifacts.UniswapV3Factory.abi,
        artifacts.UniswapV3Factory.bytecode,
        owner
    );
    //  console.log("UniswapV3Factory: ", Factory)


    factory = await Factory.deploy()

    //  console.log("-------------------------------------", factory)

    SwapRouter = new ContractFactory(
        artifacts.SwapRouter.abi,
        artifacts.SwapRouter.bytecode,
        owner
    );
    swapRouter = await SwapRouter.deploy(factory.address, weth.address)

    NFTDescriptor = new ContractFactory(
        artifacts.NFTDescriptor.abi,
        artifacts.NFTDescriptor.bytecode,
        owner
    )
    nftDescriptor = await NFTDescriptor.deploy()

    console.log("(*****************************************************************************)")

    
    // const linkedBytecode = linkLibraries({
    //     bytecode: artifacts.NonfungibleTokenPositionDescriptor.bytecode,
    //     linkReferences: {
    //         "NFTDescriptor.sol": {
    //             NFTDescriptor: [{
    //                 length: 20,
    //                 start: 1261
    //             }
    //             ],
    //         },
    //     },

    // },
    //     {

    //         NFTDescriptor: nftDescriptor.address,

    //     }
    // )
    //   console.log("222222222222")
    NonfungibleTokenPositionDescriptor = new ContractFactory(
        artifacts.NonfungibleTokenPositionDescriptor.abi,
        // linkedBytecode,
        owner
    )
    nonfungibleTokenPositionDescriptor =
        await NonfungibleTokenPositionDescriptor.deploy(weth.address)

    console.log(NonfungibleTokenPositionDescriptor)

    NonfungiblePositionManager = new ContractFactory(
        artifacts.NonfungiblePositionManager.abi,
        artifacts.NonfungiblePositionManager.bytecode,
        owner
    )
    nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
        factory.address,
        weth.address,
        nonfungibleTokenPositionDescriptor.address
    )

    console.log("wethAddress=", weth.address)
    console.log("factoryAddress=", factory.address)
    console.log("swapRouterAddress=", swapRouter.address)
    console.log("nftDescriptorAddress=", nftDescriptor.address)
    console.log("PositionDescriptorAddress=", nonfungibleTokenPositionDescriptor.address)
    console.log("positionManagerAddresss=", nonfungiblePositionManager.adress)

}

// npx hardhat run --network localhost scripts/uniswapContract.js

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })