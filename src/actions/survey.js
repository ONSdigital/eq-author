export const LOAD_SURVEY = 'LOAD_SURVEY'
export const SAVE_SURVEY = 'SAVE_SURVEY'

export function loadSurvey(survey) {
  return { type: LOAD_SURVEY, payload: { survey: survey } }
}
