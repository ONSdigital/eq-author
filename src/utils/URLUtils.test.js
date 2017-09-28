import { getUrlParams, getLink } from "utils/URLUtils";

describe("Utils > getUrlParams", () => {
  it("should extract only url params", () => {
    const params = {
      questionnaireId: "1",
      sectionId: "2",
      pageId: "3",
      foo: "bar"
    };

    const result = getUrlParams(params);

    expect(result).toEqual({
      questionnaireId: "1",
      sectionId: "2",
      pageId: "3"
    });
  });
});

describe("getLink", () => {
  it("should produce link to a page", () => {
    const result = getLink("1", "10", "5");
    expect(result).toBe("/questionnaire/1/design/10/5");
  });
});
