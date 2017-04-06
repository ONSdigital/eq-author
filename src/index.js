import React from 'react'
import ReactDOM from 'react-dom'

import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, bindActionCreators } from 'redux'
import reducers from './reducers'

import { createMiddleware, reducer, createLoader } from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import createHistory from 'history/createHashHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import routes from './routes'

import App from 'components/App'
import * as actionCreators from 'actions/actionCreators'

const storageReducer = reducer(reducers)
const storageEngine = createEngine('eq-authoring-prototype-storage-key')
const storageMiddleware = createMiddleware(storageEngine)

const history = createHistory()

let store = createStore(storageReducer, composeWithDevTools(
  applyMiddleware(routerMiddleware(history), storageMiddleware)
))

const load = createLoader(storageEngine)

const RouteWithLayout = (route) => {

  const Page = (props) => {
    return (
      <route.component {...props} />
    )
  }

  const mapStateToProps = (state) => ({
    file: state.file
  })

  const mapDispatchToProps = (dispatch) => {
    return {
      push: bindActionCreators(push, dispatch),
      actions: bindActionCreators(actionCreators, dispatch)
    }
  }

  const ConnectedPage = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)

  if (route.layout) {
    return (
      <Route exact path={route.path} render={(props) => (
        <route.layout {...route}>
          <ConnectedPage />
        </route.layout>
      )}/>
    )
  }
  else {
    return <ConnectedPage />
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
