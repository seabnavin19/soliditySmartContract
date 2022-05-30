pragma solidity ^0.4.17;

contract piggy_bank
{
    struct owner {
        uint balance;
        uint expireTime;
    }
    mapping (address => owner) balances;

    function deposit(uint time) public payable
    {
        if (balances[msg.sender].balance == 0)
        {
            balances[msg.sender].expireTime = time;
        }
        balances[msg.sender].balance += msg.value;
    }

    function withdraw(uint expiretime) public {
        require(expiretime > balances[msg.sender].expireTime);

        msg.sender.transfer(balances[msg.sender].balance);
        balances[msg.sender].balance = 0;
        balances[msg.sender].expireTime = 0;
    }

    function viewBalance() public view returns(uint) 
    {
        return balances[msg.sender].balance;
    }

    function viewExpireTime() public view returns(uint) 
    {
        return balances[msg.sender].expireTime;
    }
}