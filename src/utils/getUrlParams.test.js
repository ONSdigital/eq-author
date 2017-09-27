import getUrlParams from "utils/getUrlParams";

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
