const truffleAssert = require('truffle-assertions');
const CasaNostraPizza = artifacts.require("./CasaNostraPizza.sol");

const validDid = "did:example:abcdefg12345";
const validName = "Gareth Oates";
const validPizzaId = 1;

contract('CasaNostraPizza', async (accounts) => {
    let contract;

    beforeEach(async () => {
        contract = await CasaNostraPizza.new();
    });

    afterEach(async () => {
        await contract.kill();
    });

    it("should deploy successfully", async () => {
        const pizza = await contract.pizzaList.call(1);

        const expected = "Chicago Town";
        const actual = pizza.name;

        assert.equal(expected, actual);
    });

    it("should add a user with unknown did", async () => {
        const result = await contract.userLoggedIn(
            "did:example:23354553",
            "Helene Kvellestad Isaksen"
        );

        truffleAssert.eventEmitted(result, "newUserRegistered");
    });

    it("should recognise when a known user logs in", async () => {
        const result = await contract.userLoggedIn(
            validDid,
            validName
        );

        truffleAssert.eventEmitted(result, "existingUserLoggedIn");
    });

    it("should stop an unknown user placing an order", async () => {
        await truffleAssert.reverts(
            contract.placeOrder(
                "did:notfound:21234",
                0,
                1
            ), "User not recognised"
        );
    });

    it("should stop an order for an unknown pizza", async () => {
        await truffleAssert.reverts(
            contract.placeOrder(
                validDid,
                2,
                1
            ), "No Pizza Found"
        );
    });

    it("should not allow orders for 0 pizzas", async () => {
        await truffleAssert.reverts(
            contract.placeOrder(
                validDid,
                validPizzaId,
                0
            ), "Must order at least 1 pizza"
        )
    });

    it("should not accept order with insufficient funds", async () => {
        await truffleAssert.reverts(
            contract.placeOrder(
                validDid,
                validPizzaId,
                1, {from: accounts[0], value: 1}
            ), "Ether sent does not cover cost of order"
        )
    });

    it("should accept a valid order", async () => {
        const result = await contract.placeOrder(
            validDid,
            validPizzaId,
            1,
            { from: accounts[0], value: 2 }
        )

        truffleAssert.eventEmitted(result, "orderPlaced");
    });

});
