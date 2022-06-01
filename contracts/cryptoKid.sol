// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.7;

contract CryptoKids {
    address owner;

    struct Kid {
        address payable walletAddress;
        string firstName;
        uint256 releaseTime;
        uint256 amount;
        bool canWithdraw;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can use this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    Kid[] public kids;

    function addKid(
        address payable wAddress,
        string memory name,
        uint256 releaseTime,
        uint256 amount,
        bool canWithdraw
    ) public onlyOwner {
        kids.push(Kid(wAddress, name, releaseTime, amount, canWithdraw));
    }

    function balanceOf() public view returns (uint256) {
        return address(this).balance; // ????
    } // use view keyword to optimize gas

    function deposit(address walletAddress) public payable onlyOwner {
        uint256 index = getIndex(walletAddress);
        kids[index].amount += msg.value;
    }

    function getIndex(address walletAddress) private view returns (uint256) {
        for (uint256 i = 0; i < (kids.length); i++) {
            if (kids[i].walletAddress == walletAddress) {
                return i;
            }
        }
        return 999;
    }

    function withDrawable(address walletAddress) public returns (bool) {
        uint256 i = getIndex(walletAddress);
        require(block.timestamp < kids[i].releaseTime, "You cannot withdraw");
        kids[i].canWithdraw = true;
        return true;
    }

    function withdraw(address payable walletAddress) public payable {
        uint256 i = getIndex(walletAddress);
        require(
            msg.sender == kids[i].walletAddress,
            "You must be the kid to withdraw"
        );
        require(
            kids[i].canWithdraw == true,
            "You are not able to withdraw at this time"
        );
        kids[i].walletAddress.transfer(kids[i].amount);
    }
}
