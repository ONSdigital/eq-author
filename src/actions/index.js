import {set, keys, values} from 'lodash'

export const CHANGE_QUESTION = 'CHANGE_QUESTION'
export const CHANGE_RESPONSE = 'CHANGE_RESPONSE'
export const REMOVE_OPTION = 'REMOVE_OPTION'

export function changeQuestion(value) {
  return { type: CHANGE_QUESTION, value: {...set({}, keys(value)[0], values(value)[0])} }
}

export function changeResponse(index, value) {
  return { type: CHANGE_RESPONSE, index: index, value: value }
}

export function removeOption(answerIndex, optionIndex) {
  return { type: REMOVE_OPTION, answerIndex: answerIndex, optionIndex: optionIndex }
}
