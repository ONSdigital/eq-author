import { combineReducers } from 'redux'
import question from './question'
import answers from './answers'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
  question,
  answers,
  routing: routerReducer
})

export default reducers
