import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers, BigNumber } from "ethers";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

const chainId = 1

const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/e7dae488f57c46288ba0cc26738629f3"
)

const router = new AlphaRouter({ chainId: chainId, provider: provider })
const name0 = "Wrapped Ether"
const symbol0 = "WETH"
const decimals0 = 18
const address0 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"

const name1 = "DAI"
const symbol1 = "DAI"
const decimals1 = 18
const address1 = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

const WETH = new Token(chainId, address0, decimals0, symbol0, name0)
const DAI = new Token(chainId, address1, decimals1, symbol1, name1)

export const swapUpdatePrice = async (
    inputAmount,
    slippageAmount,
    deadLine,
    WalletAddress) => {
        const percentSlippage = new Percent(slippageAmount, 100)
        const wei = ethers.utils.parseUnits(inputAmount.toString(), decimals0)
        const currencyAmount = CurrencyAmount.fromRawAmount(
            WETH,
            BigNumber.from(wei)
        )
        const route = await router.route(currencyAmount, DAI, TradeType.EXACT_INPUT, {
            recipient: WalletAddress,
            slippageTolerance: percentSlippage,
            deadLine: deadLine
        })

        const transcation = {
            data: route.methodParameters.calldata,
            to: V3_SWAP_ROUTER_ADDRESS,
            value: BigNumber.from(route.methodParameters.value),
            from: WalletAddress,
            gasPrice: BigNumber.from(route.gasPriceWei),
            gasLimit: ethers.utils.hexlify(1000000)

        }
        const qoutedAmountOut = route.quote.toFixed(6)
        const ratio = (inputAmount / qoutedAmountOut).toFixed(3)

        console.log(qoutedAmountOut, ratio)

        return [transcation, qoutedAmountOut, ratio]

    }