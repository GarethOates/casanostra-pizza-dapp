import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from '../user/userReducer'
import pizzaReducer from '../layouts/pizza/pizzaReducer'
import orderReducer from '../layouts/order/orderReducer'
import toppingsReducer from '../layouts/toppings/toppingsReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  pizza: pizzaReducer,
  order: orderReducer,
  toppings: toppingsReducer
})

export default reducer
