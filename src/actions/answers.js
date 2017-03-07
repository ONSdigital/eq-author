export const CHANGE_ANSWER = 'CHANGE_ANSWER'
export const REMOVE_OPTION = 'REMOVE_OPTION'
export const ADD_OPTION = 'ADD_OPTION'

export function changeAnswer(index, value) {
  return { type: CHANGE_ANSWER, index: index, value: value }
}

export function removeOption(answerIndex, optionIndex) {
  return { type: REMOVE_OPTION, answerIndex: answerIndex, optionIndex: optionIndex }
}

export function addOption(answerIndex, option) {
  return { type: ADD_OPTION, answerIndex: answerIndex, option: option }
}
