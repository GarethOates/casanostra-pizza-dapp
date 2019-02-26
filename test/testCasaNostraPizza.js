const truffleAssert = require('truffle-assertions');
const CasaNostraPizza = artifacts.require("./CasaNostraPizza.sol");

const validDid = "did:example:abcdefg12345";
const validPizzaId = 1;

contract('CasaNostraPizza', async (accounts) => {
    let contract;

    beforeEach(async () => {
        contract = await CasaNostraPizza.new();
    });

    afterEach(async () => {
        await contract.kill();
    });

    it("should store number of pizzas", async () => {
        const expected = 2;
        const actual = await contract.totalPizzas();

        assert.equal(expected, actual);
    });

    it("should return valid pizzas by id", async () => {
        const pizzaCount = await contract.totalPizzas();
        const pizzas = [];

        for(i = 1; i <= pizzaCount; i++) {
            const pizza = await contract.pizzaList.call(i);

            pizzas.push(pizza);
        }

        assert.equal(pizzas.length, pizzaCount);
    });

    it("should add a user with unknown did", async () => {
        const result = await contract.userLoggedIn("did:example:23354553");

        truffleAssert.eventEmitted(result, "newUserRegistered");
    });

    it("should recognise when a known user logs in", async () => {
        const result = await contract.userLoggedIn(validDid);

        truffleAssert.eventEmitted(result, "existingUserLoggedIn");
    });

    it("should signup an unknown user placing an order", async () => {
        const result = await contract.placeOrder(
            "did:notfound:21234",
            1,
            1,
            { from: accounts[0], value: 5 });

        truffleAssert.eventEmitted(result, "newUserRegistered");
        truffleAssert.eventEmitted(result, "orderPlaced");
    });

    it("should stop an order for an unknown pizza", async () => {
        await truffleAssert.reverts(
            contract.placeOrder(
                validDid,
                3,
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
