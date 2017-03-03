import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import authorApp from './reducers'

import { createMiddleware, reducer, createLoader } from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/App'
import './index.css'

const storageReducer = reducer(authorApp)
const storageEngine = createEngine('eq-authoring-prototype-storage-key')
const middleware = createMiddleware(storageEngine)

import * as schema from './data/schema-v1.js'

let store = createStore(storageReducer, composeWithDevTools(
  applyMiddleware(middleware)
))


const load = createLoader(storageEngine)
load(store).then((newState) => {
  ReactDOM.render(
    <Provider store={store}>
      <App schema={schema.default} />
    </Provider>  ,
    document.getElementById('root')
  )
})
