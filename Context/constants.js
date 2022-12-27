// deploy to bootoken 0x7A28cf37763279F774916b85b5ef8b64AB421f79
// deploy to Lifetoken 0x2BB8B93F585B43b06F3d523bf30C203d3B6d4BD4
// deploy to SingleSwapToken 0xB7ca895F81F20e05A5eb11B05Cbaab3DAe5e23cd
// deploy to SwapMultiHop 0xd0EC100F1252a53322051a95CF05c32f0C174354

import booToken from './BooToken.json'
import lifeToken from './LifeToken.json'
import singleSwapToken from './SingleSwapToken.json'
import swapMultiHop from './SwapMultiHop.json'
import ieth from './IETH.json'

export const BooTokenAddress="0x7A28cf37763279F774916b85b5ef8b64AB421f79"
export const BooTokenABI=booToken.abi

export const LifeTokenAddress = "0x2BB8B93F585B43b06F3d523bf30C203d3B6d4BD4"
export const LifeTokenABI=lifeToken.abi

export const SingleSwapTokenAddress="0xB7ca895F81F20e05A5eb11B05Cbaab3DAe5e23cd"
export const SingleSwapTokenABI=singleSwapToken.abi

export const SwapMultiHopAddress="0xB7ca895F81F20e05A5eb11B05Cbaab3DAe5e23cd"
export const SwapMultiHopABI=swapMultiHop.abi

export const WIETHAddess= "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
export const WIETHABI=ieth.abi