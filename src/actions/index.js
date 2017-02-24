import {set } from 'lodash'

export const CHANGE = 'CHANGE'

export function change({key, value}) {
  return { type: CHANGE, value: {...set({}, key, value)} }
}
