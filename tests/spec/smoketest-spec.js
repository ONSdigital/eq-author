import { goToUrl, getPageHTML, getPageTitle, exists } from "../helper";

describe("eQ Author", () => {
  describe("navigate to the Homepage", () => {
    beforeAll(() => {
      goToUrl("http://localhost:3000/");
    });

    it("displays page title", () => {
      expect(getPageTitle()).toEqual("eQ Author Prototype");
    });

    it("displays select to begin", () => {
      expect(getPageHTML("#root")).toContain("Select to begin");
    });

    it("presents user with buttons to create or load questionnaire", () => {
      expect(exists("#btn-create-questionnaire")).toBe(true);
      expect(exists("#btn-load-questionnaire")).toBe(true);
    });
  });
});
