import { takeEvery, call, put } from "redux-saga/effects";
import { getPizzaById, getTotalPizzas } from '../../provider/casaNostraPizzaContract'

export function* pizzaSagas() {
    yield takeEvery('GET_PIZZAS', getPizzas);
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