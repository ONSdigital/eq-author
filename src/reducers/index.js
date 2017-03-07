import { combineReducers } from 'redux'
import question from './question'
import answers from './answers'

const authorApp = combineReducers({
  question,
  answers
})

export default authorApp
