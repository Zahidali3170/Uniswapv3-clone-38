//const { ethers } = require("ethers");
// const { get } = require("http");

//const { ethers } = require("ethers")

async function main(){
    const [owner, signer2]= await ethers.getSigners()

    console.log(owner. signer2)

    Zahid= await ethers.getContractFactory("Zahid", owner)
    zahid= await Zahid.deploy()

    Ali= await ethers.getContractFactory("ALi", owner)
    ali= await Ali.deploy()

    PopUp= await ethers.getContractFactory("PopUp", owner)
    popUp= await PopUp.deploy()

    console.log(popUp)

    await zahid.connect(owner).mint(signer2.address, ethers.utils.parseEther("100000"))
        
    await ali
        .connect(owner)
        .mint(signer2.address, ethers.utils.parseEther("100000"))
        
    await popUp
        .connect(owner)
        .mint(signer2.address, ethers.utils.parseEther("100000"))

    console.log("Zahid Address" , zahid.address)    
    console.log("Ali Address" , ali.address)   
    console.log("PopUp Address" , popUp.address)    

    // npx hardhat run --network localhost scripts/deployToken.js

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// deploy
// Zahid Address 0x408F924BAEC71cC3968614Cb2c58E155A35e6890
// Ali Address 0x773330693cb7d5D233348E25809770A32483A940
// PopUp Address 0x52173b6ac069619c206b9A0e75609fC92860AB2A