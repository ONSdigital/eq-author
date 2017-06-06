import {
  goToUrl,
  getElementText,
  getPageHTML,
  getPageTitle,
  findPageElements
} from "../helper";

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
      const buttons = findPageElements("button");
      expect(buttons.length).toEqual(2);
      expect(getElementText(buttons[0])).toEqual("Create survey");
      expect(getElementText(buttons[1])).toEqual("Load survey");
    });
  });
});
