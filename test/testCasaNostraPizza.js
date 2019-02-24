const truffleAssert = require('truffle-assertions');
const CasaNostraPizza = artifacts.require("./CasaNostraPizza.sol");

contract('CasaNostraPizza', async (accounts) => {
    it ("should deploy successfully.", async () => {
        const contract = await CasaNostraPizza.deployed();
        const pizza = await contract.pizzaList.call(1);

        const expected = "Chicago Town";
        const actual = pizza.name;

        assert.equal(expected, actual);
    });

    it ("should add a user with unknown did.", async () => {
        const contract = await CasaNostraPizza.deployed();
        const result = await contract.userLoggedIn.call(
            "did:example:23354553",
            "Helene Kvellestad Isaksen"
        )

        truffleAssert.eventEmitted(result, "newUserRegistered");
    });
});
