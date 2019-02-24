const truffleAssert = require('truffle-assertions');
const CasaNostraPizza = artifacts.require("./CasaNostraPizza.sol");

const validDid = "did:example:abcdefg12345";
const validName = "Gareth Oates";
const validPizzaId = 1;

contract('CasaNostraPizza', async (accounts) => {
    it("should deploy successfully", async () => {
        const contract = await CasaNostraPizza.deployed();
        const pizza = await contract.pizzaList.call(1);

        const expected = "Chicago Town";
        const actual = pizza.name;

        assert.equal(expected, actual);
    });

    it("should add a user with unknown did", async () => {
        const contract = await CasaNostraPizza.deployed();
        const result = await contract.userLoggedIn(
            "did:example:23354553",
            "Helene Kvellestad Isaksen"
        );

        truffleAssert.eventEmitted(result, "newUserRegistered");
    });

    it("should recognise when a known user logs in", async () => {
        const contract = await CasaNostraPizza.deployed();
        const result = await contract.userLoggedIn(
            validDid,
            validName
        );

        truffleAssert.eventEmitted(result, "existingUserLoggedIn");
    });

    it("should stop an unknown user placing an order", async () => {
        const contract = await CasaNostraPizza.deployed();

        await truffleAssert.reverts(
            contract.placeOrder(
                "did:notfound:21234",
                0,
                1
            ), "User not recognised"
        );
    });

    it("should stop an order for an unknown pizza", async () => {
        const contract = await CasaNostraPizza.deployed();

        await truffleAssert.reverts(
            contract.placeOrder(
                validDid,
                2,
                1
            ), "No Pizza Found"
        );
    });

});
