import { expect } from 'chai';
import { ethers } from 'hardhat';

const deployINPV = async () => {
  const INPV = await ethers.getContractFactory('INPV');
  const inpv = await INPV.deploy();
  await inpv.deployed();

  return inpv;
};

describe('Indonesia President Voting', function () {
  it('Should have total supply of INPV token equal to 500', async function () {
    const inpv = await deployINPV();

    expect(await inpv.totalSupply()).to.equal(500);
    expect(await inpv.symbol()).to.equal('INPV');
  });

  it('Should approve register voter and gift them 1 INPV token', async function () {
    const [, addr1, addr2] = await ethers.getSigners();

    const inpv = await deployINPV();

    await inpv.approveRegisterVoter('1001', addr1.address);
    await inpv.approveRegisterVoter('1002', addr2.address);

    expect(await inpv.connect(addr1).myBalance()).to.equal(1);
    expect(await inpv.connect(addr2).myBalance()).to.equal(1);
    expect(await inpv.myBalance()).to.equal(498);

    const voters = await inpv.getAllVoters();

    expect(voters.length).to.equal(2);
  });

  it('should open and close voting correctly', async function () {
    const inpv = await deployINPV();

    await inpv.openVoting();
    expect(await inpv.isVoting()).to.equal(true);

    await inpv.closeVoting();
    expect(await inpv.isVoting()).to.equal(false);
  });

  it('should be able vote candidate one', async function () {
    const [, addr1] = await ethers.getSigners();
    const inpv = await deployINPV();

    await inpv.approveRegisterVoter('1001', addr1.address);
    await inpv.openVoting();

    await inpv.connect(addr1).voteCandidateOne('1001');

    expect(await inpv.totalSupply()).to.equal(499);
    expect(await inpv.candidateOne()).to.equal(1);
  });

  it('should be able vote candidate two', async function () {
    const [, addr1] = await ethers.getSigners();
    const inpv = await deployINPV();

    await inpv.approveRegisterVoter('1001', addr1.address);
    await inpv.openVoting();

    await inpv.connect(addr1).voteCandidateTwo('1001');

    expect(await inpv.totalSupply()).to.equal(499);
    expect(await inpv.candidateTwo()).to.equal(1);
  });

  it('should fetch my info', async function () {
    const [, addr1] = await ethers.getSigners();
    const inpv = await deployINPV();

    await inpv.approveRegisterVoter('1001', addr1.address);

    const voter = await inpv.connect(addr1).myInfo('1001');

    expect(voter.isVal).to.equal(true);
    expect(voter.voterAddress).to.equal(addr1.address);
  });
});
