import { LOAD_FILE } from 'actions/actionCreators'

const file = (state = {}, action) => {
  switch (action.type) {
    case LOAD_FILE:
      return {...action.data}
    default:
      return state
  }
}

export default file
