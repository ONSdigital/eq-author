import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'

import { routerReducer, routerMiddleware } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

import App from 'containers/App'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

const render = (RootComponent) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <RootComponent history={history}/>
      </Provider>
    </AppContainer>
    ,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('containers/App', () => {
    const NextApp = require('containers/App').default
    render(NextApp)
  });
}
