import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import reducer from './reducer'
import createSagaMiddleware from "redux-saga"
import thunkMiddleware from 'redux-thunk'
import rootSaga from './sagas/rootSaga'

// Setup Saga middelware
const sagaMiddleware = createSagaMiddleware();

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      thunkMiddleware,
      routingMiddleware
    )
  )
)

sagaMiddleware.run(rootSaga)

export default store
