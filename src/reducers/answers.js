import {merge} from 'lodash'
import { CHANGE_ANSWER, CHANGE_ANSWER_OPTIONS } from 'actions/answers'

const initialState = [{
    "id": "",
    "description": "",
    "mandatory": true,
    "guidance": "",
    "options": [],
    "label": "",
    "type": "TextField",
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
    case CHANGE_ANSWER_OPTIONS:
      newState = state.map(e => e)
      newState[action.index].options = action.options
      return newState
    default:
      return state
  }
}

export default answers
