export const CHANGE_ANSWER = 'CHANGE_ANSWER'
export const CHANGE_ANSWER_OPTIONS = 'CHANGE_ANSWER_OPTIONS'

export function changeAnswer(index, value) {
  return { type: CHANGE_ANSWER, index: index, value: value }
}

export function changeAnswerOptions(index, options) {
  return { type: CHANGE_ANSWER_OPTIONS, index: index, options: options }
}
