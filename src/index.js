import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'

import { createMiddleware, reducer, createLoader } from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import routes from './routes'

import App from 'components/App'

const history = createHistory()

const storageReducer = reducer(reducers)
const storageEngine = createEngine('eq-authoring-prototype-storage-key')
const storageMiddleware = createMiddleware(storageEngine)

let store = createStore(storageReducer, composeWithDevTools(
  applyMiddleware(routerMiddleware(history), storageMiddleware)
))

const load = createLoader(storageEngine)

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

const render = (RootComponent) => {
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
}

load(store).then(newState => render(App))

if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;
    render(NextApp);
  });
}
