import {merge} from 'lodash'
import { CHANGE_QUESTION, CHANGE_ANSWER, REMOVE_OPTION, ADD_OPTION } from '../actions'

const initialState = {
  "description": "",
  "id": "",
  "number": "",
  "title": "",
  "type": "",
  "guidance": {
    "title": "",
    "text": ""
  },
  "answers": [{
        "id": "",
        "description": "",
        "mandatory": true,
        "guidance": "",
        "options": [],
        "type": "",
        "validation": {
            "messages": {
                "MANDATORY": ""
            }
        }
    }],
}

const question = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUESTION:
      return {...merge(state, action.value)}
    case CHANGE_ANSWER:
      let newState = {...state}
      merge(newState.answers[action.index], action.value)
      return newState
    case REMOVE_OPTION:
      newState = {...state}
      newState.answers[action.answerIndex].options.splice(action.optionIndex, 1)
      return newState
    case ADD_OPTION:
      newState = {...state}
      newState.answers[action.answerIndex].options.push(action.option)
      return newState
    default:
      return state
  }
}

export default question
