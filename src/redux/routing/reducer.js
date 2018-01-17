import { combineReducers } from "redux";

import {
  ADD_RULE,
  SELECT_ELSE,
  REMOVE_RULE,
  SELECT_RULE_GOTO,
  SELECT_OPTIONS,
  SELECT_OPTION,
  ADD_OPTION,
  REMOVE_OPTION,
  DESELECT_OPTION,
  SELECT_CONDITION_COMPARATOR,
  CHANGE_CONDITION_QUESTION,
  ADD_AND_CONDITION,
  ADD_OR_CONDITION,
  REMOVE_CONDITION,
  ADD_PAGE
} from "redux/routing/actions";

import {
  IF,
  AND,
  OR,
  YEARS_FROM,
  MONTHS_FROM,
  DAYS_FROM
} from "components/Routing/constants";

import { omit, omitBy, find, pull } from "lodash";

const pagesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_PAGE: {
      const { pageId } = action;
      const page = {
        id: pageId,
        rules: []
      };

      return {
        ...state,
        [pageId]: page
      };
    }

    case SELECT_ELSE: {
      const { optionId } = action;
      return {
        ...state,
        else: optionId
      };
    }

    case ADD_RULE: {
      const { pageId, ruleId } = action;
      const page = state[pageId];
      return {
        ...state,
        [pageId]: {
          ...page,
          rules: page.rules.concat(ruleId)
        }
      };
    }

    case REMOVE_RULE: {
      const { ruleId } = action;
      const pageId = find(state, page => find(page.rules, c => c === ruleId))
        .id;
      const page = state[pageId];
      return {
        ...state,
        [pageId]: {
          ...page,
          rules: pull(state[pageId].rules, ruleId)
        }
      };
    }

    default:
      return state;
  }
};

const addRule = (state, { ruleId, conditionId }) => {
  const newRule = {
    id: ruleId,
    conditions: [conditionId]
  };

  return {
    ...state,
    [ruleId]: newRule
  };
};

const removeRule = (state, { ruleId }) => omit(state, ruleId);

const addConditionToRule = (state, { ruleId, conditionId }) => {
  const rule = state[ruleId];
  return {
    ...state,
    [ruleId]: {
      ...rule,
      conditions: [...rule.conditions, conditionId]
    }
  };
};

const rulesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RULE: {
      return addRule(state, action);
    }

    case REMOVE_RULE: {
      return removeRule(state, action);
    }

    case ADD_AND_CONDITION:
    case ADD_OR_CONDITION: {
      return addConditionToRule(state, action);
    }

    case REMOVE_CONDITION: {
      const { conditionId } = action;
      const rule = find(state, r => find(r.conditions, c => c === conditionId));
      return {
        ...state,
        [rule.id]: {
          ...rule,
          conditions: pull(rule.conditions, conditionId)
        }
      };
    }

    case SELECT_RULE_GOTO: {
      const { ruleId, optionId } = action;
      const rule = state[ruleId];

      return {
        ...state,
        [ruleId]: {
          ...rule,
          goto: optionId
        }
      };
    }

    default:
      return state;
  }
};

const addCondition = (state, action, type) => {
  const { conditionId, pageId, ruleId } = action;

  return {
    ...state,
    [conditionId]: {
      id: conditionId,
      ruleId,
      selectedQuestionId: pageId,
      selectedOptions: [],
      type
    }
  };
};

const removeCondition = (state, action) => {
  const { conditionId } = action;
  return omit(state, conditionId);
};

const conditionsReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_AND_CONDITION: {
      return addCondition(state, action, AND);
    }

    case ADD_OR_CONDITION: {
      return addCondition(state, action, OR);
    }

    case REMOVE_CONDITION: {
      return removeCondition(state, action);
    }

    case ADD_RULE: {
      return addCondition(state, action, IF);
    }

    case REMOVE_RULE: {
      return omitBy(state, condition => condition.ruleId === action.ruleId);
    }

    case CHANGE_CONDITION_QUESTION: {
      const { conditionId, selectedQuestionId } = action;
      return {
        ...state,
        [conditionId]: {
          ...state[conditionId],
          selectedQuestionId
        }
      };
    }

    case SELECT_OPTIONS: {
      const { selectedOptions, conditionId } = action;
      const condition = state[conditionId];

      return {
        ...state,
        [conditionId]: {
          ...condition,
          selectedOptions
        }
      };
    }

    case SELECT_OPTION: {
      const { optionId, conditionId } = action;
      const condition = state[conditionId];

      return {
        ...state,
        [conditionId]: {
          ...condition,
          selectedOptions: { ...condition.selectedOptions, [optionId]: true }
        }
      };
    }

    case DESELECT_OPTION: {
      const { optionId, conditionId } = action;
      const condition = state[conditionId];

      return {
        ...state,
        [conditionId]: {
          ...condition,
          selectedOptions: { ...condition.selectedOptions, [optionId]: false }
        }
      };
    }

    case ADD_OPTION: {
      const { optionId, conditionId, data } = action;
      const condition = state[conditionId];

      return {
        ...state,
        [conditionId]: {
          ...condition,
          selectedOptions: { ...condition.selectedOptions, [optionId]: data }
        }
      };
    }

    case REMOVE_OPTION: {
      const { optionId, conditionId } = action;
      const condition = state[conditionId];

      return {
        ...state,
        [conditionId]: {
          ...condition,
          selectedOptions: omit(condition.selectedOptions, optionId)
        }
      };
    }

    case SELECT_CONDITION_COMPARATOR: {
      const { conditionId, optionId } = action;
      const condition = state[conditionId];

      if ([MONTHS_FROM, YEARS_FROM, DAYS_FROM].includes(optionId)) {
        if (!find(condition.selectedOptions, { type: "Date" })) {
          const id = Date.now();
          condition.selectedOptions = {
            ...condition.selectedOptions,
            [id]: {
              type: "Date",
              comparison: "completion",
              id
            }
          };
        }
      } else {
        const completionDateOption = find(condition.selectedOptions, {
          type: "Date",
          comparison: "completion"
        });
        if (completionDateOption) {
          condition.selectedOptions = {
            ...omit(condition.selectedOptions, completionDateOption.id)
          };
        }
      }

      return {
        ...state,
        [conditionId]: {
          ...condition,
          comparator: optionId
        }
      };
    }

    default:
      return state;
  }
};

const routingReducer = combineReducers({
  pages: pagesReducer,
  rules: rulesReducer,
  conditions: conditionsReducer
});

export default routingReducer;
