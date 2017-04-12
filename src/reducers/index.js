import { combineReducers } from 'redux'
import question from './question'
import answers from './answers'
import file from './file'
import { routerReducer as routing } from 'react-router-redux'

const reducers = combineReducers({
  question,
  answers,
  file,
  routing
})

export default reducers
