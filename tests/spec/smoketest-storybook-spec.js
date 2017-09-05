import { goToUrl, getPageTitle } from "../helper";

let links;

describe("Storybook @watch", () => {
  beforeAll(() => {
    goToUrl("http://localhost:9001/");
    links = browser.elements("[role=menuitem]").value;
  });

  it("displays page title", () => {
    expect(getPageTitle()).toEqual("Storybook");
  });

  it("should display links to stories", () => {
    expect(links.length).toBeGreaterThan(0); // body...
  });

  it("can navigate links", () => {
    links.map(element => {
      element.scroll();
      const result = browser.elementIdClick(element.ELEMENT);
      expect(result.state).toEqual("success");
    });
  });
});
