import {merge} from 'lodash'
import { CHANGE_QUESTION } from 'actions/question'

const initialState = {
  "description": "",
  "id": "",
  "number": "",
  "title": "",
  "type": "",
  "guidance": {
    "title": "",
    "text": ""
  }
}

const question = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_QUESTION:
      return {...merge(state, action.value)}
    default:
      return state
  }
}

export default question
