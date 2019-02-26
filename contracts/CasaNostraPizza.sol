pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract CasaNostraPizza is Ownable, Pausable {

    struct Pizza {
        string name;
        string description;
        string imageHash;
        uint price;
        bool exists;
    }

    struct Order {
        User user;
        Pizza pizza;
        uint32 quantity;
        uint total;
        uint orderPlacedTime;
        uint orderReceivedTime;
        bool orderReceived;
    }

    struct User {
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
    event newUserRegistered(string did);
    event existingUserLoggedIn(string did);
    event orderPlaced(uint orderId);
    event balanceNowUpdated(uint256 newBalance);

    /// @title constructor
    /// @dev Constructor
    /// @dev Initialise dummy user and pizza
    constructor() public {
        totalUsers = 1; // 1 dummy user hard-coded
        totalPizzas = 2; // 2 dummy pizza hard-coded

        userIndex["did:example:abcdefg12345"] = 1;
        userList[1].did = "did:example:abcdefg12345";
        userList[1].totalOrders = 0;
        userList[1].totalLogins = 1;

        pizzaList[1].name = "Chicago Town";
        pizzaList[1].description = "BBQ-marinert kyllingfilet, BBQ-saus, bacon, purre og rødløk. Toppes med bladpersille og nykvernet pepper etter steking.";
        pizzaList[1].imageHash = "http://clipart-library.com/images/qiBALM9aT.png";
        pizzaList[1].price = 2 ether;
        pizzaList[1].exists = true;

        pizzaList[2].name = "Meat Feast";
        pizzaList[2].imageHash = "http://clipart-library.com/images/qiBALM9aT.png";
        pizzaList[2].description = "Fullverdig vegansk pizza sprinklet med smaksrik vegansk chili aioli. Toppet med pulled Oumph!, rødløk, tomat og purre.";
        pizzaList[2].price = 3 ether;
        pizzaList[2].exists = true;
    }

    /// @title userLoggedIn
    /// @dev User logged in
    /// @param _did Unique identifier for user
    function userLoggedIn(string memory _did) public {
        if (userIndex[_did] != 0) {
            userList[userIndex[_did]].totalLogins++;
            emit existingUserLoggedIn(_did);

            return;
        }

        totalUsers++;

        userIndex[_did] = totalUsers;
        userList[totalUsers].did = _did;
        userList[totalUsers].totalOrders = 0;
        userList[totalUsers].totalLogins += 1;

        emit newUserRegistered(_did);
    }

    /// @title placeOrder
    /// @dev Places an order for the user
    /// @param _did Unique identifier of the user
    /// @param _pizzaId The Id of the pizza the user has ordered
    /// @param _quantity Number of pizzas ordered
    /// @return bool Order Succeeded
    function placeOrder(string memory _did, uint32 _pizzaId, uint32 _quantity)
    public payable returns (bool) {
        require(pizzaList[_pizzaId].exists, "No Pizza Found");
        require(_quantity > 0, "Must order at least 1 pizza");
        require(msg.value >= pizzaList[_pizzaId].price * _quantity, "Ether sent does not cover cost of order");

        if (userIndex[_did] == 0) {
            userLoggedIn(_did);
        }

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

        return true;
    }

    /// @dev Fallback function
    function () external payable {}

    /// @title Kill
    /// @dev Destroys the smart-contract and returns funds to owner
    function kill() external onlyOwner {
        selfdestruct(msg.sender);
    }
}