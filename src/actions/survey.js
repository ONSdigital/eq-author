import { normalize } from "normalizr";
import { surveySchema } from "schema";

export const LOAD_SURVEY = "LOAD_SURVEY";
export const SAVE_SURVEY = "SAVE_SURVEY";
export const CLEAR_SURVEY = "CLEAR_SURVEY";

export function loadSurvey(surveyData) {
  const schema = normalize(surveyData, surveySchema);
  const { groups, blocks, sections, questions, answers } = schema.entities;
  return {
    type: LOAD_SURVEY,
    payload: {
      ...schema.entities.survey[surveyData.id],
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
    type: CLEAR_SURVEY
  };
}
