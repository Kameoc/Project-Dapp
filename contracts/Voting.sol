// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public status;
    mapping(address => Voter) public voters;
    Proposal[] public proposals;
    uint public winningProposalId;

    event VoterRegistered(address voterAddress);
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted(address voter, uint proposalId);

    constructor() Ownable(msg.sender) {
        status = WorkflowStatus.RegisteringVoters;
    }

    function registerVoter(address _voter) external onlyOwner {
        require(status == WorkflowStatus.RegisteringVoters, "Registration closed");
        require(!voters[_voter].isRegistered, "Already registered");
        
        voters[_voter] = Voter(true, false, 0);
        emit VoterRegistered(_voter);
    }

    function submitProposal(string memory _desc) external {
        require(status == WorkflowStatus.ProposalsRegistrationStarted, "Not in proposal phase");
        require(voters[msg.sender].isRegistered, "Not a registered voter");

        proposals.push(Proposal(_desc, 0));
        emit ProposalRegistered(proposals.length - 1);
    }

    function vote(uint _proposalId) external {
        require(status == WorkflowStatus.VotingSessionStarted, "Not in voting phase");
        require(voters[msg.sender].isRegistered, "Not registered");
        require(!voters[msg.sender].hasVoted, "Already voted");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedProposalId = _proposalId;
        proposals[_proposalId].voteCount++;

        emit Voted(msg.sender, _proposalId);
    }

    function startProposalsRegistration() external onlyOwner {
    require(status == WorkflowStatus.RegisteringVoters, "Cannot start proposals registration now");
    emit WorkflowStatusChange(status, WorkflowStatus.ProposalsRegistrationStarted);
    status = WorkflowStatus.ProposalsRegistrationStarted;
}

function endProposalsRegistration() external onlyOwner {
    require(status == WorkflowStatus.ProposalsRegistrationStarted, "Cannot end proposals registration now");
    emit WorkflowStatusChange(status, WorkflowStatus.ProposalsRegistrationEnded);
    status = WorkflowStatus.ProposalsRegistrationEnded;
}

function startVotingSession() external onlyOwner {
    require(status == WorkflowStatus.ProposalsRegistrationEnded, "Cannot start voting session now");
    emit WorkflowStatusChange(status, WorkflowStatus.VotingSessionStarted);
    status = WorkflowStatus.VotingSessionStarted;
}

function endVotingSession() external onlyOwner {
    require(status == WorkflowStatus.VotingSessionStarted, "Cannot end voting session now");
    emit WorkflowStatusChange(status, WorkflowStatus.VotingSessionEnded);
    status = WorkflowStatus.VotingSessionEnded;
}

function tallyVotes() external onlyOwner {
    require(status == WorkflowStatus.VotingSessionEnded, "Cannot tally votes now");
    
    uint winningVoteCount = 0;
    for (uint i = 0; i < proposals.length; i++) {
        if (proposals[i].voteCount > winningVoteCount) {
            winningVoteCount = proposals[i].voteCount;
            winningProposalId = i;
        }
    }

    emit WorkflowStatusChange(status, WorkflowStatus.VotesTallied);
    status = WorkflowStatus.VotesTallied;
}

}
