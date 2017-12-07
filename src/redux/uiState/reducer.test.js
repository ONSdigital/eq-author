import { CANVAS_SECTION_FOCUS } from "redux/uiState/actions";
import reducer, { getSelectedSection } from "redux/uiState/reducer";
import createAction from "tests/utils/createAction";

describe("uiState reducer", () => {
  it("should initially return an empty selectedSection string", () => {
    expect(reducer(undefined, createAction())).toEqual({
      selectedSection: ""
    });
  });

  it("should set selectedSection state by ID from action", () => {
    expect(
      reducer(
        undefined,
        createAction(CANVAS_SECTION_FOCUS, {
          id: "Section1"
        })
      )
    ).toEqual({ selectedSection: "Section1" });
  });
});

describe("uiState selectors", () => {
  describe("getSelectedSection", () => {
    it("should select selectedSection from state", () => {
      expect(getSelectedSection({ selectedSection: "Section1" })).toEqual(
        "Section1"
      );
    });
  });
});
