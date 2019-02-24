import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from '../user/userReducer'
import pizzaReducer from '../layouts/pizza/pizzaReducer'

const reducer = combineReducers({
  routing: routerReducer,
  user: userReducer,
  pizza: pizzaReducer
})

export default reducer
