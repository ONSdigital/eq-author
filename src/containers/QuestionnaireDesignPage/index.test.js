import { mapStateToProps } from "./";

describe("containers/QuestionnaireDesignPage", () => {
  describe("mapStateToProps", () => {
    it("should map question, section and page id's from state to props", () => {
      const params = {
        questionnaireId: "1",
        sectionId: "2",
        pageId: "3"
      };
      const extraParams = {
        ...params,
        dontWantThisId: "4"
      };
      const props = mapStateToProps(null, {
        match: { params: extraParams }
      });
      expect(props).toEqual(params);
    });
  });
});
