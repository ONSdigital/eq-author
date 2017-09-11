import getUrlParams from "utils/getUrlParams";

describe("Utils > getUrlParams", () => {
  it("should convert matched questionnaireId to a number", () => {
    const params = {
      questionnaireId: "1",
      sectionId: "2",
      pageId: "3"
    };

    const result = getUrlParams(params);

    expect(result).toEqual({
      questionnaireId: 1,
      sectionId: 2,
      pageId: 3
    });
  });
});
