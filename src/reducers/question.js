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
  "answers": [{
    "id": "permanent-or-family-home-answer",
        "mandatory": true,
        "guidance": "<p>For most people, their permanent home will be the address where they spend the most time.</p>",
        "options": [{
            "label": "Yes",
            "value": "Yes"
        }, {
            "label": "No",
            "value": "No",
        }],
        "type": "Radio",
  }],
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
