import { CHANGE } from '../actions'

const initialState = {
  "description": "Lorem ipsum",
  "id": "question-1",
  "number": "1",
  "title": "Which side of the force are you on?",
  "type": "General",
  "guidanceTitle": "Guidance",
  "guidanceText": "This is the guidance for this question",
  "answers": [],
}

const question = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        ...action.value
      }
    default:
      return state
  }
}

export default question
