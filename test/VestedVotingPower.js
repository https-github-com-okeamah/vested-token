const { expect } = require('chai');
const { ether } = require('@openzeppelin/test-helpers');

const INCH_ADDR = '0x111111111117dC0aa78b770fA6A738034120C302';
const V1INCH_ADDR = '0x03d1B1A56708FA298198DD5e23651a29B76a16d2';
const ST1INCH_ADDR = '0x9A0C8Ff858d273f57072D714bca7411D717501D7';
const IERC20 = artifacts.require('IERC20');
const VestedVotingPower = artifacts.require('VestedVotingPower');
const VestedToken = artifacts.require('VestedToken');

const vestings = [
    '0xA8cCF2B22A4fD872e533AfbBc21664Ee6dC1c262',
];

describe('VestedVotingPower', async function () {
    before(async function () {
        this.INCH = await IERC20.at(INCH_ADDR);
        this.VestedToken = await VestedToken.at(V1INCH_ADDR);
        this.VestedVotingPower = await VestedVotingPower.new(V1INCH_ADDR, ST1INCH_ADDR);
    });

    it('should be ok', async function () {
        await this.VestedVotingPower.registerVestings(vestings);
        expect(await this.VestedToken.balanceOf('0x46aBbc9fc9d8E749746B00865BC2Cf7C4d85C837')).to.be.bignumber.equal(ether('1875000'));
        expect(await this.VestedVotingPower.votingPowerOf('0x46aBbc9fc9d8E749746B00865BC2Cf7C4d85C837')).to.be.bignumber.lt(ether('130000'));
    });
});
