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

    it("presents user with buttons to create or load survey", () => {
      expect(exists("#btn-create-survey")).toBe(true);
      expect(exists("#btn-load-survey")).toBe(true);
    });
  });
});
