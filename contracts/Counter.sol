pragma solidity ^0.4.17;
contract Counter {
    uint public count = 0 ;
    // event Increment(uint value);
    // event Decrement(uint value);

    function getcount() view public returns(uint){
        return count;
    }

    function increment() public {
        count += 1;
        // emit Increment(count);
    }

    function decrement() public {
        count -= 1;
        // emit Decrement(count);
    }
}


