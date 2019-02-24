pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract CasaNostraPizza is Ownable, Pausable {

    struct Pizza {
        string name;
        string description;
        string imageHash;
        uint32 price;
    }

    struct Order {
        User user;
        Pizza pizza;
        uint32 quantity;
        uint32 total;
        uint orderPlacedTime;
        uint orderReceivedTime;
        bool orderReceived;
    }

    struct User {
        string name;
        string did;
        uint32 totalOrders;
        uint32 totalLogins;
    }

    mapping(uint32 => Pizza) public pizzaList;
    mapping(uint32 => Order) private orderList;

    mapping(string => uint32) private userIndex; // 0 if new user
    mapping(uint32 => User) private userList; // 0 means no user. 1st user index 1.

    // Global Variables
    uint32 public totalPizzas;
    uint32 public totalOrders;
    uint32 public totalUsers;

    // Events
    event newUserRegistered(string did, string name);
    event existingUserLoggedIn(string did, string name);
    event orderPlaced(uint orderId);
    event balanceNowUpdated(uint256 newBalance);


    /// @dev Constructor
    /// @dev Initialise dummy user and pizza
    constructor() public {
        totalUsers = 1; // 1 dummy user hard-coded
        totalPizzas = 1; // 1 dummy pizza hard-coded

        userIndex["did:example:abcdefg12345"] = 1;
        userList[1].name = "Gareth Oates";
        userList[1].did = "did:example:abcdefg12345";
        userList[1].totalOrders = 0;
        userList[1].totalLogins = 1;

        pizzaList[1].name = "Chicago Town";
        pizzaList[1].description = "BBQ-marinert kyllingfilet, BBQ-saus, bacon, purre og rødløk. Toppes med bladpersille og nykvernet pepper etter steking.";
        pizzaList[1].imageHash = "http://clipart-library.com/images/qiBALM9aT.png";
    }

    /// @dev User logged in
    /// @param _did Unique identifier for user
    /// @param _name Name of the user
    function userLoggedIn(string memory _did, string memory _name) public {
        if (userIndex[_did] != 0) {
            userList[userIndex[_did]].totalLogins++;
            emit existingUserLoggedIn(_did, _name);

            return;
        }

        totalUsers++;

        userIndex[_did] = totalUsers;
        userList[totalUsers].name = _name;
        userList[totalUsers].did = _did;
        userList[totalUsers].totalOrders = 0;
        userList[totalUsers].totalLogins += 1;

        emit newUserRegistered(_did, _name);

    }

    /// @dev Places an order for the user
    /// @param _did Unique identifier of the user
    /// @param _pizzaId The Id of the pizza the user has ordered
    /// @param _quantity Number of pizzas ordered
    function placeOrder(string memory _did, uint32 _pizzaId, uint32 _quantity)
    public payable verifyOrder(_did, _pizzaId, _quantity) returns (bool) {

        User memory user = userList[userIndex[_did]];
        user.totalOrders++;

        Pizza memory pizza = pizzaList[_pizzaId];

        totalOrders++;
        orderList[totalOrders].user = user;
        orderList[totalOrders].pizza = pizza;
        orderList[totalOrders].quantity = _quantity;
        orderList[totalOrders].total = pizza.price * _quantity;
        orderList[totalOrders].orderPlacedTime = block.timestamp;
        orderList[totalOrders].orderReceived = false;

        emit orderPlaced(totalOrders);

    }

    modifier verifyOrder(string memory _did, uint32 _pizzaId, uint32 _quantity) {
        require(userIndex[_did] != 0, "User not recognised");
        require(_pizzaId > 0, "No Pizza Found");
        require(_quantity > 0, "Must order at least 1 pizza");
        require(msg.value >= pizzaList[_pizzaId].price * _quantity, "Ether sent does not cover cost of order");

        _;
    }

    /// @dev Fallback function
    function () external payable {}

    /// @dev The owner can add ETH to the contract when the contract is not paused
    function addBalance() public payable onlyOwner whenNotPaused {
        emit balanceNowUpdated(address(this).balance);
    }

    /// @dev The owner can withdraw ETH from the contract when the contract is not paused
    /// @param amount Value to be withdrawn in wei
    function withdrawBalance (uint256 amount) public onlyOwner whenNotPaused {
        msg.sender.transfer(amount);

        emit balanceNowUpdated(address(this).balance);
    }

}