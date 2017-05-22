/* eslint-disable camelcase */

import { merge, omit, includes, find } from "lodash";

import { SURVEY_LOAD } from "actions/survey";

import {
  ITEM_UPDATE,
  ITEM_ADD,
  ITEM_ADD_COMPLETE,
  ITEM_REMOVE
} from "actions/surveyItems";

export const defaultState = {
  blocks: {
    introduction: {
      type: "Introduction",
      id: "introduction",
      information_to_provide: []
    }
  },
  sections: {},
  questions: {},
  answers: {},
  groups: {}
};

const getItemByType = (type, name) => {
  return {
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
  }[type];
};

const items = (state = defaultState, action) => {
  const { payload } = action;

  switch (action.type) {
    case ITEM_UPDATE:
      return merge({}, state, {
        [payload.type]: {
          [payload.id]: {
            [payload.field]: payload.value
          }
        }
      });

    case ITEM_ADD: {
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
    }

    case ITEM_ADD_COMPLETE: {
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
    }

    case ITEM_REMOVE:
      return {
        ...state,
        [payload.type]: {
          ...omit(state[payload.type], payload.id)
        }
      };

    case SURVEY_LOAD:
      return {
        ...state,
        ...payload.items
      };

    default:
      return state;
  }
};

export default items;
