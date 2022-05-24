pragma solidity ^0.4.17;

contract Register {
    struct Student {
        uint studentId;
        string studentName;
    }
    mapping(address => uint) balances;

    Student[] public students;
    address public teacher = msg.sender;
    uint public nextStudentId = 1;

    function registerStudent(string memory name) public payable {
        require(msg.sender == teacher);
//        require(msg.sender == teacher, 'ONLY Teacher can perform student registration.');
        if (msg.value < 0.0001 ether) {
            revert();
//            revert("Value must be more than 1 ether");
        }
        balances[msg.sender] += msg.value;
        students.push(Student(nextStudentId, name));
        nextStudentId++ ;
    }
    
    // Send ether to smart contract address function payable
    // function invest() external payable {
    //     if(msg.value < 0.0001 ether) {
    //         revert("Value should be more than 1 ether");
    //     }
    //     balances[msg.sender] += msg.value;
    // }

    function checkBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getStudentById(uint id) view public returns(uint, string memory) {
        uint studentIndex = findStudentId(id);
        return (students[studentIndex].studentId, students[studentIndex].studentName);
    }

    function findStudentId(uint id) view internal returns (uint) {
        for(uint student = 0; student < students.length; student++) {
            if(students[student].studentId == id) {
                return student;
            }
        }
    //        revert("Student does not exists. Please Register his/her first!!");
    }

}