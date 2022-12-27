
// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: {
//     compilers: [
//       { version: "0.8.7" },
//       { version: "0.7.6" },
//       { version: "0.6.6" },
//       { version: "0.5.0" },
//       { version: "0.4.0" },
//     ],
//   },
//   networks: {
//     hardhat: {
//       forking: {
//         //url: "https://eth-mainnet.g.alchemy.com/v2/3fZmT3qNNxTuVc7IhiiBX-kydITbkti9",
//         url: "https://mainnet.infura.io/v3/e7dae488f57c46288ba0cc26738629f3"
//       },
//     },
//   },
// };


require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {

    // compilers: [
    //   { version: "0.8.7" },
    //   { version: "0.7.6" },
    //   { version: "0.6.6" },
    //   { version: "0.5.0" },
    //   { version: "0.4.0" },
    // ],
    version : "0.7.6",
    settings:{
      optimizer:{
        enabled:true,
        runs:5000,
        details:{yul:false}
      }
    }

  },
  networks: {
    hardhat: {
      forking: {
        //url: "https://eth-mainnet.g.alchemy.com/v2/3fZmT3qNNxTuVc7IhiiBX-kydITbkti9",
        url: "https://mainnet.infura.io/v3/e7dae488f57c46288ba0cc26738629f3",
        accounts:[
          `0x${"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"}`
        ],

      },
    },
  },
};
