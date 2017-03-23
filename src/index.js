import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import authorApp from './reducers'

import { createMiddleware, reducer, createLoader } from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from 'components/App'

const storageReducer = reducer(authorApp)
const storageEngine = createEngine('eq-authoring-prototype-storage-key')
const middleware = createMiddleware(storageEngine)

let store = createStore(storageReducer, composeWithDevTools(
  applyMiddleware(middleware)
))

const load = createLoader(storageEngine);

const render = (RootComponent) => {
  ReactDOM.render(
    <Provider store={store}>
      <RootComponent />
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
