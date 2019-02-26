import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Profile from './user/layouts/profile/Profile'
import Pizza from './layouts/pizza/Pizza'
import Order from './layouts/order/Order'

// Redux Store
import store from './store/store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="pizza" component={UserIsAuthenticated(Pizza)} />
          <Route path="order" component={UserIsAuthenticated(Order)} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
