import {merge} from 'lodash'
import { CHANGE_ANSWER, REMOVE_OPTION, ADD_OPTION } from 'actions/answers'

const initialState = [{
    "id": "",
    "description": "",
    "mandatory": true,
    "guidance": "",
    "options": [],
    "label": "",
    "type": "",
    "validation": {
        "messages": {
            "MANDATORY": ""
        }
    }
}]

const answers = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ANSWER:
      let newState = state.map(e => e)
      merge(newState[action.index], action.value)
      return newState
    case REMOVE_OPTION:
      newState = state.map(e => e)
      newState[action.answerIndex].options.splice(action.optionIndex, 1)
      return newState
    case ADD_OPTION:
      newState = state.map(e => e)
      newState[action.answerIndex].options.push(action.option)
      return newState
    default:
      return state
  }
}

export default answers
