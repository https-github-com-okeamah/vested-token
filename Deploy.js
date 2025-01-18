const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const VestedToken = await hre.ethers.getContractFactory("VestedToken");
  const vestedToken = await VestedToken.deploy(
    "0x24E1A6814d05a583Aad62B1E1dE5D1A5E71E7CB0", // Token Address
    "DAVID OKEAMAH", // Owner Name
    [ // Vesting schedule
      {
        beneficiary: "0x97293ceab815896883e8200aef5a4581a70504b2",
        start_time: Math.floor(Date.now() / 1000), // Start time
        cliff_duration: 31536000, // 1 year
        vesting_duration: 63072000 // 2 years
      }
    ]
  );

  console.log("VestedToken contract deployed to:", vestedToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
