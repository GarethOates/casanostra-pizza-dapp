import { pizzaSagas } from './pizzaSagas';
import { all } from "redux-saga/effects";

export default function* rootSaga() {
    yield all([
        pizzaSagas()
    ])
}