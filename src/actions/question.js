import {set, keys, values} from 'lodash'

export const CHANGE_QUESTION = 'CHANGE_QUESTION'

export function changeQuestion(value) {
  return { type: CHANGE_QUESTION, value: {...set({}, keys(value)[0], values(value)[0])} }
}
