const hre = require('hardhat');
const { getChainId } = hre;

const V1INCH_ADDR = '0x03d1B1A56708FA298198DD5e23651a29B76a16d2';
const ST1INCH_ADDR = '0x9A0C8Ff858d273f57072D714bca7411D717501D7';
const MAX_FEE_PER_GAS = 30e9;
const MAX_PRIORITY_FEE_PER_GAS = 5e8;

module.exports = async ({ deployments, getNamedAccounts }) => {
    console.log('running deploy script');
    console.log('network id ', await getChainId());

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const vestedVotingPowerDeployment = await deploy('VestedVotingPower', {
        args: [V1INCH_ADDR, ST1INCH_ADDR],
        from: deployer,
        maxFeePerGas: MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    });

    console.log('VestedVotingPower deployed to:', vestedVotingPowerDeployment.address);

    if (await getChainId() !== '31337') {
        await hre.run('verify:verify', {
            address: vestedVotingPowerDeployment.address,
            constructorArguments: [V1INCH_ADDR, ST1INCH_ADDR],
        });
    }
};

module.exports.skip = async () => true;
