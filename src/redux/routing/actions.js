export const ADD_PAGE = "ADD_PAGE";
export const SELECT_ELSE = "SELECT_ELSE";

export const ADD_RULE = "ADD_RULE";
export const REMOVE_RULE = "REMOVE_RULE";
export const SELECT_RULE_GOTO = "SELECT_RULE_GOTO";
export const SELECT_RULE_ELSE = "SELECT_RULE_ELSE";

export const SELECT_OPTIONS = "SELECT_OPTIONS";
export const SELECT_OPTION = "SELECT_OPTION";
export const DESELECT_OPTION = "DESELECT_OPTION";
export const ADD_OPTION = "ADD_OPTION";
export const REMOVE_OPTION = "REMOVE_OPTION";

export const ADD_AND_CONDITION = "ADD_AND_CONDITION";
export const ADD_OR_CONDITION = "ADD_OR_CONDITION";
export const REMOVE_CONDITION = "REMOVE_CONDITION";

export const SELECT_CONDITION_COMPARATOR = "SELECT_CONDITION_COMPARATOR";
export const CHANGE_CONDITION_QUESTION = "CHANGE_CONDITION_QUESTION";

export const addPage = pageId => ({
  type: ADD_PAGE,
  pageId,
  ruleId: Date.now(),
  conditionId: Date.now() + 1
});

export const selectElse = optionId => ({
  type: SELECT_ELSE,
  optionId
});

export const addRule = pageId => ({
  type: ADD_RULE,
  ruleId: Date.now(),
  conditionId: Date.now() + 1,
  pageId
});

export const removeRule = ruleId => ({
  type: REMOVE_RULE,
  ruleId
});

export const addOption = (conditionId, data, optionId) => ({
  type: ADD_OPTION,
  conditionId,
  optionId: optionId || Date.now(),
  data
});

export const removeOption = (conditionId, optionId) => ({
  type: REMOVE_OPTION,
  conditionId,
  optionId
});

export const selectOption = (conditionId, optionId) => ({
  type: SELECT_OPTION,
  conditionId,
  optionId
});

export const deselectOption = (conditionId, optionId) => ({
  type: DESELECT_OPTION,
  conditionId,
  optionId
});

export const selectOptions = (opts, conditionId, questionId) => ({
  type: SELECT_OPTIONS,
  selectedOptions: opts,
  selectedQuestionId: questionId,
  conditionId
});

export const selectQuestion = (conditionId, selectedQuestionId) => ({
  type: CHANGE_CONDITION_QUESTION,
  conditionId,
  selectedQuestionId
});

export const addAndCondition = (ruleId, pageId) => ({
  type: ADD_AND_CONDITION,
  conditionId: Date.now(),
  ruleId,
  pageId
});

export const addOrCondition = (ruleId, pageId) => ({
  type: ADD_OR_CONDITION,
  conditionId: Date.now(),
  ruleId,
  pageId
});

export const removeCondition = conditionId => ({
  type: REMOVE_CONDITION,
  conditionId
});

export const selectRuleGoto = (ruleId, optionId) => ({
  type: SELECT_RULE_GOTO,
  ruleId,
  optionId
});

export const selectConditionComparator = (conditionId, optionId) => ({
  type: SELECT_CONDITION_COMPARATOR,
  conditionId,
  optionId
});
