import { CANVAS_SECTION_FOCUS } from "redux/uiState/actions";

export default (state = { selectedSection: "" }, action) => {
  switch (action.type) {
    case CANVAS_SECTION_FOCUS: {
      return {
        ...state,
        selectedSection: action.payload.id
      };
    }

    default:
      return state;
  }
};

export const getSelectedSection = state => state.selectedSection;
