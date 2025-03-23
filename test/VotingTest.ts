import { ethers } from "hardhat";
import { expect } from "chai";
import { Voting } from "../typechain-types";

describe("Voting", function () {
    let voting: Voting;
    let owner: any, addr1: any, addr2: any;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        const VotingFactory = await ethers.getContractFactory("Voting");
        voting = (await VotingFactory.deploy()) as Voting;
    });

    it("Should allow the owner to register voters", async function () {
        await voting.connect(owner).registerVoter(addr1.address);
        const voter = await voting.voters(addr1.address);
        expect(voter.isRegistered).to.equal(true);
    });

    it("Should allow a registered voter to submit a proposal", async function () {
        await voting.connect(owner).registerVoter(addr1.address);

        // 🔥 Passage à la phase de soumission de propositions
        await voting.connect(owner).startProposalsRegistration();

        await voting.connect(addr1).submitProposal("New Policy");
        const proposal = await voting.proposals(0);
        expect(proposal.description).to.equal("New Policy");
    });

    it("Should allow a registered voter to vote", async function () {
        await voting.connect(owner).registerVoter(addr1.address);
        await voting.connect(owner).registerVoter(addr2.address);

        // 🔥 Passage à la phase de soumission de propositions
        await voting.connect(owner).startProposalsRegistration();
        await voting.connect(addr1).submitProposal("Proposal 1");

        // 🔥 Fin de la phase de propositions et début du vote
        await voting.connect(owner).endProposalsRegistration();
        await voting.connect(owner).startVotingSession();

        await voting.connect(addr2).vote(0);
        const voter = await voting.voters(addr2.address);
        expect(voter.hasVoted).to.equal(true);
    });
    it("Should tally votes and get winner", async function () {
      await voting.registerVoter(addr1.address);
      await voting.registerVoter(addr2.address);
      await voting.startProposalsRegistration();
      await voting.connect(addr1).submitProposal("Proposal 1");
      await voting.connect(addr2).submitProposal("Proposal 2");
      await voting.endProposalsRegistration();
      await voting.startVotingSession();
      await voting.connect(addr1).vote(0);
      await voting.connect(addr2).vote(1);
      await voting.endVotingSession();
      await voting.tallyVotes();
      const winner = await voting.getWinner();
      expect(winner).to.equal("Proposal 1");
    });
    it("should return the workflfow status", async function () {
      const status = await voting.getStatus();
      expect(status).to.equal("Registering Voters");
    });
  
});
