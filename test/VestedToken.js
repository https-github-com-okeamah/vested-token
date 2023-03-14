const hre = require('hardhat');
const { expect } = require('chai');
const { ether, expectEvent, constants } = require('@openzeppelin/test-helpers');

const INCH_ADDR = '0x111111111117dC0aa78b770fA6A738034120C302';
const IERC20 = artifacts.require('IERC20');
const VestedToken = artifacts.require('VestedToken');
const IStepVesting = artifacts.require('IStepVesting');

const vestings = [
    '0x1C30Bc98984Af21B4b8ea6CC1109E2FAc3987905',
    '0x0ac6ff4dBdE9cEeDC6d4c08B14ceD9FF19A013aB',
    '0x32757Da4Bd73a35F05806Ee91CDB4B1746e63a45',
];

describe('VestedToken', async function () {
    before(async function () {
        this.INCH = await IERC20.at(INCH_ADDR);
        this.VestedToken = await VestedToken.new(INCH_ADDR);
    });

    it('should be ok', async function () {
        await this.VestedToken.registerVestings(vestings);
        expect(await this.VestedToken.balanceOf('0x4942b20750163675DDf004476FFE46626652dfD0')).to.be.bignumber.equal(ether('18750000'));
        expect(await this.VestedToken.balanceOf('0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B')).to.be.bignumber.equal(ether('13926250'));
        expectEvent(
            await this.VestedToken.deregisterVestings(['0x32757Da4Bd73a35F05806Ee91CDB4B1746e63a45']),
            'VestingDeregistered',
            {
                vesting: '0x32757Da4Bd73a35F05806Ee91CDB4B1746e63a45',
                receiver: '0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B',
            },
        );
        expect(await this.VestedToken.balanceOf('0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B')).to.be.bignumber.equal(ether('11073750'));
        await hre.network.provider.request({
            method: 'hardhat_impersonateAccount',
            params: ['0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B'],
        });

        await hre.network.provider.request({
            method: 'hardhat_setBalance',
            params: ['0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B', '0x' + ether('100').toString(16)],
        });
        await hre.network.provider.request({
            method: 'evm_setNextBlockTimestamp',
            params: [1690000000],
        });
        await hre.network.provider.request({
            method: 'evm_mine',
        });
        const vesting = await IStepVesting.at('0x0ac6ff4dBdE9cEeDC6d4c08B14ceD9FF19A013aB');
        expect(await this.VestedToken.balanceOf('0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B')).to.be.bignumber.equal(ether('11073750'));
        await vesting.claim({ from: '0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B' });
        expect(await this.VestedToken.balanceOf('0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B')).to.be.bignumber.equal('0');
        expectEvent(
            await this.VestedToken.updateBalances(['0x0ac6ff4dBdE9cEeDC6d4c08B14ceD9FF19A013aB']),
            'Transfer',
            {
                from: '0x4Dc06c025Cb97d6Dc4A17183187e28D297B83C7B',
                to: constants.ZERO_ADDRESS,
                value: ether('11073750').toString(),
            },
        );
    });
});
