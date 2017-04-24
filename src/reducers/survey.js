import { LOAD_SURVEY } from 'actions/survey'

const defaultState = {
  title: '',
  data_version: '0.0.1',
  description: 'asdsadd',
  groups: [

  ],
  legal_basis: '',
  messages: {

  },
  mime_type: 'application/json/ons/eq',
  schema_version: '0.0.1',
  survey_id: '',
  theme: ''
}

export default function survey(state = defaultState, action) {
  switch (action.type) {
    case LOAD_SURVEY:
      return {
        ...state,
        ...action.payload.survey
      }
    default:
      return state
  }
}
