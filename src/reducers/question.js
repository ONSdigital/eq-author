import {merge} from 'lodash'

import { CHANGE } from '../actions'

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
  "answers": [],
}

const question = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return {...merge(state, action.value)}
    default:
      return state
  }
}

export default question
