import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

import createHistory from 'history/createHashHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import routes from './routes'

const history = createHistory()

let store = createStore(reducers, composeWithDevTools(
  applyMiddleware(routerMiddleware(history))
))

const RouteWithLayout = (route) => {
  if (route.layout) {
    return (
      <Route exact path={route.path} render={(props) => (
        <route.layout {...route}>
          <route.component />
        </route.layout>
      )}/>
    )
  }
  else {
    return <route.component />
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        {routes.map(route => (
          <RouteWithLayout key={route.path} {...route} />
        ))}
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
