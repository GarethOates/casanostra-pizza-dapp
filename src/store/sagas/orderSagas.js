import { takeEvery, call, put } from "redux-saga/effects"
import { placeOrder, getOrderById, getTotalOrders } from '../../provider/casaNostraPizzaContract'

export function* orderSagas() {
    yield takeEvery('GET_ORDERS', getOrders);
    yield takeEvery('ORDER_PIZZA', orderPizza);
}

export function* getOrders() {
    yield put({ type: 'GETTING_ORDERS' })

    const orders = [];
    const numberOfOrders = yield call(getTotalOrders);

    for(let i = 1; i <= numberOfOrders; i++) {
        let order = yield call(getOrderById, i);

        orders.push({
            user: order.user,
            pizza: order.pizza,
            quantity: order.quantity,
            total: order.total,
            orderPlacedTime: order.orderPlacedTime,
            orderReceivedTime: order.orderReceivedTime,
            orderReceived: order.orderReceived
        });

        yield put({ type: 'GOT_ORDERS'})
    }
}

export function* orderPizza(action) {
    yield put({ type: 'PLACING_ORDER' });

    const result = yield call(
        placeOrder,
        action.payload.did,
        action.payload.pizzaId,
        action.payload.quantity
    );

    yield put({ type: 'PIZZA_ORDERED', payload: result });
}