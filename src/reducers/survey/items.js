/* eslint-disable camelcase */

import { merge, omit, includes, find } from "lodash";

import { LOAD_SURVEY } from "actions/survey";

import {
  UPDATE_ITEM,
  ADD_ITEM,
  ADD_ITEM_COMPLETE,
  REMOVE_ITEM
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
    case UPDATE_ITEM:
      return merge({}, state, {
        [payload.type]: {
          [payload.id]: {
            [payload.field]: payload.value
          }
        }
      });

    case ADD_ITEM: {
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

    case ADD_ITEM_COMPLETE: {
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

    case REMOVE_ITEM:
      return {
        ...state,
        [payload.type]: {
          ...omit(state[payload.type], payload.id)
        }
      };

    case LOAD_SURVEY:
      return {
        ...state,
        ...payload.items
      };

    default:
      return state;
  }
};

export default items;
