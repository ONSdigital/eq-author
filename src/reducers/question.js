import {merge} from 'lodash'
import { CHANGE_QUESTION, CHANGE_RESPONSE, REMOVE_OPTION } from '../actions'

const initialState = {
  "description": "Lorem ipsum",
  "id": "question-1",
  "number": "1",
  "title": "Which side of the force are you on?",
  "type": "General",
  "guidance": {
    "title": "Include",
    "text": "Maecenas faucibus mollis interdum."
  },
  "answers": [{
        "id": "permanent-or-family-home-answer",
        "description": "",
        "mandatory": true,
        "guidance": "<p>For most people, their permanent home will be the address where they spend the most time.</p>",
        "options": [{
            "label": "Yes",
            "value": "Yes"
        }, {
            "label": "No",
            "value": "No",
            "description": "For example this is a second address or holiday home"
        }],
        "type": "Radio",
        "validation": {
            "messages": {
                "MANDATORY": "Please select an answer to continue"
            }
        }
    }],
}

const question = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUESTION:
      return {...merge(state, action.value)}
    case CHANGE_RESPONSE:
      const index = action.index
      return Object.assign({}, state, {
        answers: [
          ...state.answers.slice(0, index),
          Object.assign({}, state.answers[index], action.value),
          ...state.answers.slice(index + 1)
        ]
      })
    case REMOVE_OPTION:
      const newState = {...state}
      newState.answers[action.answerIndex].options.splice(action.optionIndex, 1)
      return newState
    default:
      return state
  }
}

export default question
