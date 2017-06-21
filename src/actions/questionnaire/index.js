import readFileAsJSON from "utils/readFileAsJson";

import { normalize } from "normalizr";
import { questionnaireSchema } from "schema";
import { push } from "react-router-redux";

export const QUESTIONNAIRE_LOAD = "QUESTIONNAIRE_LOAD";
export const QUESTIONNAIRE_LOADING = "QUESTIONNAIRE_LOADING";
export const QUESTIONNAIRE_LOAD_SUCCESS = "QUESTIONNAIRE_LOAD_SUCCESS";
export const QUESTIONNAIRE_LOAD_FAILURE = "QUESTIONNAIRE_LOAD_FAILURE";
export const QUESTIONNAIRE_SAVE = "QUESTIONNAIRE_SAVE";
export const QUESTIONNAIRE_CLEAR = "QUESTIONNAIRE_CLEAR";

export function loadQuestionnaireSuccess(questionnaireData) {
  const { entities } = normalize(questionnaireData, questionnaireSchema);
  const { groups, blocks, sections, questions, answers } = entities;

  return {
    type: QUESTIONNAIRE_LOAD_SUCCESS,
    payload: {
      items: {
        groups,
        blocks,
        sections,
        questions,
        answers
      }
    }
  };
}

export function clearQuestionnaire() {
  return {
    type: QUESTIONNAIRE_CLEAR
  };
}

export function loadQuestionnaireFailure(error) {
  return {
    type: QUESTIONNAIRE_LOAD_FAILURE,
    payload: error
  };
}

export function loadingQuestionnaire() {
  return {
    type: QUESTIONNAIRE_LOADING
  };
}

export function loadQuestionnaire(file) {
  return dispatch => {
    if (!file) {
      dispatch(loadQuestionnaireFailure(new Error("No file supplied")));
      return;
    }

    dispatch(loadingQuestionnaire());

    return readFileAsJSON(file)
      .then(data => dispatch(loadQuestionnaireSuccess(data)))
      .then(() => dispatch(push("/create")))
      .catch(error => dispatch(loadQuestionnaireFailure(error)));
  };
}
