import { pizzaSagas } from './pizzaSagas';
import { orderSagas } from './orderSagas';
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        pizzaSagas(),
        orderSagas(),
    ])
}