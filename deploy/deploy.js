const hre = require('hardhat');
const { getChainId } = hre;

const INCH_ADDR = '0x111111111117dc0aa78b770fa6a738034120c302';
const MAX_FEE_PER_GAS = 100e9;
const MAX_PRIORITY_FEE_PER_GAS = 3e9;

module.exports = async ({ deployments, getNamedAccounts }) => {
    console.log('running deploy script');
    console.log('network id ', await getChainId());

    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const vestedTokenDeployment = await deploy('VestedToken', {
        args: [INCH_ADDR],
        from: deployer,
        maxFeePerGas: MAX_FEE_PER_GAS,
        maxPriorityFeePerGas: MAX_PRIORITY_FEE_PER_GAS,
    });

    console.log('VestedToken deployed to:', vestedTokenDeployment.address);

    if (await getChainId() !== '31337') {
        await hre.run('verify:verify', {
            address: vestedTokenDeployment.address,
            constructorArguments: [INCH_ADDR],
        });
    }
};

module.exports.skip = async () => true;
