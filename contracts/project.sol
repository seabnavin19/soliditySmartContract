pragma solidity >=0.7.0 <0.9.0;

contract Freelence{

    address admin;
    mapping( address=> User) sellers;
    mapping( address=> User) buyers;
    Project[] projects;

    struct User{
        string name;
        string bio;
        address userId;
        Project[] projects;
        
        
    }

    struct Project{
        uint    id;
        string  name;
        uint    price;
        string  about;
        address owner;
        address buyer;
    }

    constructor (){
        admin= msg.sender;

    }

    function registerSeller(string memory name, string memory bio) public {
        Project[] memory myproject;
        User memory new_seller= User(name,bio,msg.sender,myproject);
        sellers[msg.sender]=new_seller;
    }

    function registerBuyser(string memory name, string memory bio) public payable{
        require(msg.value >0.1 ether);
        Project[] memory myproject;
        User memory new_buyer= User(name,bio,msg.sender,myproject);
        buyers[msg.sender]= new_buyer;

    }

    function createProject(string memory name, uint price, string memory description) public {
        Project memory new_project= Project(projects.length,name,price,description,msg.sender,msg.sender);
        projects.push(new_project);
    }

    function orderProject(uint projectId) public payable{
        require(msg.value>= projects[projectId].price);
        Project memory selected_project= projects[projectId];
        selected_project.buyer=msg.sender;
    }

    function getproject() public view returns( Project[] memory){
       return projects;
    }

    function getAllMyProject() public {
        // Project[]  buy_projects;
        // for (uint i=0;i<projects.length;i++){
        //     if(projects[i].buyer==msg.sender){
        //         Project memory  selected= projects[i];
        //         buy_projects.push(selected);
        //     }
        // }
        // return buy_projects;

    }


}