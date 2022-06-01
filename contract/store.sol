pragma solidity ^0.4.17;

contract Store {
    uint public Age;
    string public message;
    address public seller;
    address[] public buyers;
    function Store() public{
        Age = 0;
        seller = msg.sender;
    }


    function setAge (uint GivenAge) public{
        Age = GivenAge;
        if(Age >= 18){
            message = "Allowed";
            enterMoney();
        }else{
            message = "Not Allowed";
        }
    }

    function enterMoney() public payable{
        buyers.push(msg.sender);
    }
    function getBuyers() public view returns(address[]){
        return buyers;
    }
}