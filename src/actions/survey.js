import readFileAsJSON from "utils/readFileAsJson";
import { normalize } from 'normalizr';
import { surveySchema } from 'schema';
import { push } from "react-router-redux";

export const SURVEY_LOAD = 'SURVEY_LOAD';
export const SURVEY_LOAD_SUCCESS = "SURVEY_LOAD_SUCCESS";
export const SURVEY_LOAD_FAILURE = "SURVEY_LOAD_FAILURE";
export const SURVEY_SAVE = 'SURVEY_SAVE';
export const SURVEY_CLEAR = "SURVEY_CLEAR";


export function loadSurveySuccess(surveyData) {
  const { entities, result } = normalize(surveyData, surveySchema);
  const { groups, blocks, sections, questions, answers } = entities;

  return {
    type: SURVEY_LOAD_SUCCESS,
    payload: {
      ...entities.survey[result],
      groups,
      blocks,
      sections,
      questions,
      answers
    }
  };
}

export function clearSurvey() {
  return {
    type: SURVEY_CLEAR
  };
}

export function loadSurveyFailure(error) {
  return {
    type: SURVEY_LOAD_FAILURE,
    payload : error
  };
}

export function loadSurvey(file) {
  return dispatch => {
    if (!file) {
      dispatch(loadSurveyFailure(new Error("No file supplied")));
      return;
    }

    return readFileAsJSON(file)
      .then(data => dispatch(loadSurveySuccess(data)))
      .then(() => dispatch(push('/create')))
      .catch(error => dispatch(loadSurveyFailure(error)));
  };
}
