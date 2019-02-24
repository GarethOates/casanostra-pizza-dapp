import {web3} from '../util/connectors';
import CasaNostraPizzaContract from '../build/contracts/CasaNostraPizza.json';

const networkId = "1550963140489";
const abi = CasaNostraPizzaContract.abi;
const address = CasaNostraPizzaContract.networks[networkId].address;
const contract = web3.eth.Contract(abi, address);

export const getTotalPizzas = async () => {
    return await contract.methods.totalPizzas.call();
}

export const getPizzaById = async (id) => {
    return await contract.methods.pizzaList(1).call();
}