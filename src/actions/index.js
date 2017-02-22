import {set, keys, values} from 'lodash'

export const CHANGE = 'CHANGE'

export function change(value) {
  return { type: CHANGE, value: {...set({}, keys(value)[0], values(value)[0])} }
}
