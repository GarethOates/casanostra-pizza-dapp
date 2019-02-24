import { takeEvery, call, put } from "redux-saga/effects"
import { getPizzaById, getTotalPizzas, placeOrder } from '../../provider/casaNostraPizzaContract'

export function* pizzaSagas() {
    yield takeEvery('GET_PIZZAS', getPizzas);
    yield takeEvery('ORDER_PIZZA', orderPizza);
}

export function* getPizzas() {
    yield put({type: 'LOADING_PIZZAS'});

    const pizzas = [];
    const numberOfPizzas = yield call(getTotalPizzas);

    for(let i = 1; i <= numberOfPizzas; i++) {
        let pizza = yield call(getPizzaById, i);

        pizzas.push({
            name: pizza.name,
            description: pizza.description,
            image: pizza.imageHash,
            price: pizza.price
        });
    }

    yield put({ type: 'GOT_PIZZAS', payload: pizzas });
}

export function* orderPizza(action) {
    yield put({type: 'PLACING_ORDER'});

    console.log(action.payload.did);
    console.log(action.payload.pizzaId);
    console.log(action.payload.quantity);

    const result = yield call(
        placeOrder,
        action.payload.did,
        action.payload.pizzaId,
        action.payload.quantity
    );

    yield put({type: 'PIZZA_ORDERED', payload: result});
}