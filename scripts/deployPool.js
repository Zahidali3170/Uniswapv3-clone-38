// get all address in uniswapContract.js
wethAddress = ""
factoryAddress = ""
swapRouterAddress = ""
nftDescriptorAddress = ""
PositionDescriptorAddress = ""
positionManagerAddresss = ""

ZahidAddress = "0x408F924BAEC71cC3968614Cb2c58E155A35e6890"
AliAddress = "0x773330693cb7d5D233348E25809770A32483A940"
PopUpAddress = "0x52173b6ac069619c206b9A0e75609fC92860AB2A"

const artifacts = {
    UniswapV3Factory: require('@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'),
    NonfungiblePositionManager: require('@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json'),
}

const { Contract, BigNumber } = require('ethers')
const bn = require("bignumber.js")
//const { ethers } = require('hardhat')
//const { factory } = require('typescript')
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

const MAINNET_URL = "https://mainnet.infura.io/v3/e7dae488f57c46288ba0cc26738629f3"
const provider = new ethers.providers.JsonRpcProvider(MAINNET_URL)

// const provider = waffle.provider

//this function which convert the price which you want to assign to your token into a square from
function encoderPriceSqrt(reserve1, reserve0) {
    return BigNumber.from(
        new bn(reserve1.toString())
            .div(reserve0.toString())
            .sqrt()
            .multipliedBy(new bn(2).pow(96))
            .integerValue(3)
            .toString()
    )
}
console.log("***************************************************************")

const nonfungiblePositionManager = new Contract(
    positionManagerAddresss,
    artifacts.NonfungiblePositionManager.abi,
    provider
)

const factory = new Contract(
    factoryAddress,
    artifacts.UniswapV3Factory.abi,
    provider
)

async function deployPool(token0, token1, fee, price) {
    const [owner] = await ethers.getSigners()
    await nonfungiblePositionManager.connect(owner).createAndInitializePoolIfNecessary(token0, token1, fee, price, {
        gasLimit: 5000000,
    })

    const poolAddress = await factory.connect(owner).getPool(token0, token1, fee)
    return poolAddress
}

async function main() {
    const ZA = await deployPool(
        ZahidAddress,
        AliAddress,
        500,
        //set range token
        encoderPriceSqrt(1, 1)
    )
    console.log("Addess Of ZA", ZA)

}
// npx hardhat run --network localhost scripts/deployPool.js

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

