export const LOAD_SURVEY = 'LOAD_SURVEY';
export const SAVE_SURVEY = 'SAVE_SURVEY';

import {normalize} from 'normalizr';
import {surveySchema} from 'schema';

export function loadSurvey(surveyData) {
  const schema = normalize(surveyData, surveySchema);
  const {groups, blocks, sections, questions, answers} = schema.entities;
  return {
    type: LOAD_SURVEY,
    payload: {
      ...schema.entities.survey[surveyData.id],
      groups: groups,
      blocks: blocks,
      sections: sections,
      questions: questions,
      answers: answers,
    },
  };
}
