import {web3, uport} from '../util/connectors';
import CasaNostraPizzaContract from '../build/contracts/CasaNostraPizza.json';

const networkId = "4";
const abi = CasaNostraPizzaContract.abi;
const address = CasaNostraPizzaContract.networks[networkId].address;

const contract = web3.eth.Contract(abi, address);
const uContract = uport.contract(abi).at(address);

export const getTotalPizzas = async () => {
    return await contract.methods.totalPizzas.call();
}

export const getPizzaById = async (id) => {
    return await contract.methods.pizzaList(id).call();
}

export const placeOrder = async (did, pizzaId, quantity) => {
    const pizza = await getPizzaById(pizzaId);
    const total = (pizza.price * quantity);

    return await uContract.placeOrder(did, pizzaId, quantity, { value: (total / 1000).toString() });
}

export const getOrderById = async (id) => {
    return await contract.methods.orderList(id).call();
}

export const getOrdersForUser = async (did) => {
    const orderCount = await contract.methods.totalOrders.call();
    const orders = [];

    for(let id = 1; id <= orderCount; id++) {
        let order = await getOrderById(id);

        order.userDid = order.userDid.replace(/'/g, "");

        if (order.userDid === did ) {
            orders.push(order);
        }
    }

    return orders;
}