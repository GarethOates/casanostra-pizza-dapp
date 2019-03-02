import { takeEvery, call, put } from 'redux-saga/effects'
import { loadToppings } from '../../provider/casaNostraPizzaContract'


export function* toppingsSaga() {
    yield takeEvery('GET_TOPPINGS', getToppings);
}

export function* getToppings(action) {
    yield put({ type: 'GETTING_TOPPINGS' });

    const toppings = yield call(loadToppings);

    yield put({ type: 'GOT_TOPPINGS', payload: toppings});
}