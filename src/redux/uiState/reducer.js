import { SECTION_FOCUS } from "redux/uiState/actions";

export default (state = { selectedSection: "" }, action) => {
  switch (action.type) {
    case SECTION_FOCUS: {
      return {
        ...state,
        selectedSection: action.payload.id
      };
    }

    default:
      return state;
  }
};
