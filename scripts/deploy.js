const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {

  const [deployer] = await hre.ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  

  const Twitters = await hre.ethers.getContractFactory("Twitters");
  const twitters = await Twitters.deploy();
  await twitters.deployed();
  console.log("Twitter deployed to:", twitters.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
