import { takeEvery, call, put } from "redux-saga/effects"
import { placeOrder, getOrderById, getOrderIdsForUser } from '../../provider/casaNostraPizzaContract'

export function* orderSagas() {
    yield takeEvery('GET_ORDERS', getOrders);
    yield takeEvery('ORDER_PIZZA', orderPizza);
}

export function* getOrders(action) {
    yield put({ type: 'GETTING_ORDERS' })

    const ordersForUser = yield call(getOrdersForUser, action.payload);
    const orders = ordersForUser.map(order => {
        return {
            user: order.user,
            pizza: order.pizza,
            quantity: order.quantity,
            total: order.total,
            orderPlacedTime: order.orderPlacedTime,
            orderReceivedTime: order.orderReceivedTime,
            orderReceived: order.orderReceived
        }
    });

    yield put({ type: 'GOT_ORDERS', payload: orders });
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