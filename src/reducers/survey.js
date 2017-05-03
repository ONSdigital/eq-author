import { LOAD_SURVEY, CLEAR_SURVEY } from "actions/survey";
import {
  CHANGE,
  ADD_ITEM,
  ADD_ITEM_COMPLETE,
  REMOVE_ITEM
} from "actions/surveyItems";

import { merge, omit, includes, find } from "lodash";

const defaultState = {
  data_version: "0.0.1",
  description: "",
  groups: {},
  legal_basis: "StatisticsOfTradeAct",
  mime_type: "application/json/ons/eq",
  questionnaire_id: "0001",
  schema_version: "0.0.1",
  id: "000",
  theme: "default",
  title: "",
  blocks: {
    introduction: {
      type: "Introduction",
      id: "introduction",
      information_to_provide: []
    }
  },
  sections: {},
  questions: {},
  answers: {}
};

const surveyItemTypes = {
  sections: {
    description: "",
    questions: [],
    title: name
  },
  questions: {
    description: "",
    answers: [],
    guidance: [],
    type: "General",
    title: name
  },
  answers: {
    description: "",
    label: name,
    mandatory: false,
    q_code: "",
    type: ""
  }
};

const getItemByType = (type, name) => {
  return surveyItemTypes[type];
};

const survey = (state = defaultState, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOAD_SURVEY:
      return {
        ...state,
        ...payload
      };

    case CLEAR_SURVEY:
      return defaultState;

    case CHANGE:
      return merge({}, state, {
        [payload.type]: {
          [payload.id]: {
            [payload.field]: payload.value
          }
        }
      });

    case ADD_ITEM:
      const emptyItem = {
        [payload.type]: {
          [payload.id]: {}
        }
      };

      if (payload.parentId) {
        const parentSection = state[payload.parentType];
        const parent = parentSection[payload.parentId];

        return merge(
          {},
          state,
          {
            [payload.parentType]: {
              [payload.parentId]: {
                [payload.type]: [...parent[payload.type], payload.id]
              }
            }
          },
          emptyItem
        );
      } else {
        return merge({}, state, emptyItem);
      }

    case ADD_ITEM_COMPLETE:
      const newItem = {
        [payload.newId]: {
          ...getItemByType(payload.type, payload.name),
          displayName: payload.name
        }
      };

      if (payload.parentType) {
        const parentItem = find(state[payload.parentType], section => {
          return includes(section[payload.type], payload.id);
        });

        parentItem[payload.type] = [...parentItem[payload.type], payload.newId];
      }

      return merge({}, state, {
        [payload.type]: {
          ...newItem
        }
      });

    case REMOVE_ITEM:
      return {
        ...state,
        [payload.type]: {
          ...omit(state[payload.type], payload.id)
        }
      };

    default:
      return state;
  }
};

export default survey;
