//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract INPV is ERC20 {
    address private admin;
    bool public isVoting;
    uint256 public candidateOne;
    uint256 public candidateTwo;

    struct Voter {
        bool isVal;
        address voterAddress;
        bool isVoted;
    }

    mapping(string => Voter) private registeredVoters;
    string[] private registeredVotersLUT;

    constructor() ERC20("Indonesia President Voting", "INPV") {
        admin = msg.sender;
        isVoting = false;
        candidateOne = 0;
        candidateTwo = 0;
        _mint(msg.sender, 500);
    }

    function approveRegisterVoter(
        string memory identityCardNumber,
        address voterAddress
    ) public {
        uint256 currentSupply = balanceOf(admin);
        require(currentSupply > 0, "running out of token supply");
        require(
            registeredVoters[identityCardNumber].isVal == false,
            "user already registered"
        );
        require(msg.sender == admin, "you are not admin");
        registeredVoters[identityCardNumber] = Voter(true, voterAddress, false);
        registeredVotersLUT.push(identityCardNumber);
        _transfer(admin, voterAddress, 1);
    }

    function myBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }

    function myInfo(string memory identityCardNumber)
        public
        view
        returns (Voter memory)
    {
        Voter memory voter = registeredVoters[identityCardNumber];

        require(voter.isVal == true, "user not registered");
        require(voter.voterAddress == msg.sender, "your address doesn't match");

        return voter;
    }

    function getAllVoters() public view returns (Voter[] memory) {
        uint256 totalVoters = registeredVotersLUT.length;
        Voter[] memory voters = new Voter[](totalVoters);

        for (uint256 i = 0; i < registeredVotersLUT.length; i++) {
            string memory currentKey = registeredVotersLUT[i];
            voters[i] = registeredVoters[currentKey];
        }

        return voters;
    }

    function openVoting() public {
        require(msg.sender == admin, "you are not admin");
        isVoting = true;
    }

    function closeVoting() public {
        require(msg.sender == admin, "you are not admin");
        isVoting = false;
    }

    function voteCandidateOne(string memory identityCardNumber) public {
        uint256 voterBalance = balanceOf(msg.sender);
        require(msg.sender != admin, "admin cannot vote");
        require(voterBalance >= 1, "not enough amount of token");
        require(
            registeredVoters[identityCardNumber].isVal == true,
            "you aren't registered"
        );
        require(
            registeredVoters[identityCardNumber].isVoted == false,
            "you already voted"
        );
        require(isVoting == true, "voting is closed");
        candidateOne += 1;
        _burn(msg.sender, 1);
        registeredVoters[identityCardNumber].isVoted = true;
    }

    function voteCandidateTwo(string memory identityCardNumber) public {
        uint256 voterBalance = balanceOf(msg.sender);
        require(msg.sender != admin, "admin cannot vote");
        require(voterBalance >= 1, "not enough amount of token");
        require(
            registeredVoters[identityCardNumber].isVal == true,
            "you aren't registered"
        );
        require(
            registeredVoters[identityCardNumber].isVoted == false,
            "you already voted"
        );
        require(isVoting == true, "voting is closed");
        candidateTwo += 1;
        _burn(msg.sender, 1);
        registeredVoters[identityCardNumber].isVoted = true;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(
            from == admin ||
                from == 0x0000000000000000000000000000000000000000 ||
                to == 0x0000000000000000000000000000000000000000,
            "only admin can transfer"
        );
    }

    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }
}
