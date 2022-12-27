
## @uniswap/v3-periphery
This will ensure that you are testing against the same bytecode that is deployed to mainnet and public testnets, and all Uniswap code will correctly interoperate with your local deplo

## @uniswap/v3-core
This will ensure that you are testing against the same bytecode that is deployed to mainnet and public testnets, and all Uniswap code will correctly interoperate with your local deployment.


## error solve
compiler error of different contracts e.g (0.7.0) or (0.8.0) and so. go to hardhat.config.js and add this   
solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.7.6" },
      { version: "0.6.6" },
    ],
  },

  then run build command 
  1- npx hardhat node ---> (this command run local blockchain ) 
  2nd terminal run --->  npx hardhat run scripts/deploy.js --network localhost  (deploy contract).

  3- npm run dev -> (frontend command)