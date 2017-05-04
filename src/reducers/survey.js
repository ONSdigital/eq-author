import {LOAD_SURVEY, CHANGE} from 'actions/survey';
import {merge} from 'lodash';

const defaultState = {
  data_version: '0.0.1',
  description: '',
  groups: {},
  legal_basis: 'StatisticsOfTradeAct',
  mime_type: 'application/json/ons/eq',
  questionnaire_id: '0001',
  schema_version: '0.0.1',
  id: '000',
  theme: 'default',
  title: '',
  blocks: {
    introduction: {
      type: 'Introduction',
      id: 'introduction',
      information_to_provide: [],
    },
  },
  sections: {},
  questions: {},
  answers: {},
};

const mergeField = (state, {id, field, value}) => {
  return merge(state, {
    [id]: {
      [field]: value,
    },
  });
};

const sections = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      return mergeField(state, action.payload);

    default:
      return state;
  }
};

const questions = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      return mergeField(state, action.payload);

    default:
      return state;
  }
};

const answers = (state = {}, action) => {
  switch (action.type) {
    case CHANGE:
      return mergeField(state, action.payload);

    default:
      return state;
  }
};

const reducers = {
  sections: sections,
  questions: questions,
  answers: answers,
};

const survey = (state = defaultState, action) => {
  switch (action.type) {
    case LOAD_SURVEY:
      return {
        ...state,
        ...action.payload,
      };

    case CHANGE:
      const {type} = action.payload;
      const newState = reducers[type](state[type], action);

      return {
        ...state,
        [type]: newState,
      };

    default:
      return state;
  }
};

export default survey;
