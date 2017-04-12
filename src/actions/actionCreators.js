export const LOAD_FILE = 'LOAD_FILE'
export const SAVE_FILE = 'SAVE_FILE'

export function loadFile(data) {
  return { type: LOAD_FILE, data }
}
