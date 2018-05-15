import getSectionAndPageFromSelect from "utils/getSectionAndPageFromSelect";

describe("utils/getSectionAndPageFromSelect", () => {
  it("should replace Section_ in value", () => {
    expect(
      getSectionAndPageFromSelect("Section_1", "currentSectionId")
    ).toMatchObject({
      sectionId: "1"
    });
  });

  it("should replace QuestionPage_ in value", () => {
    expect(
      getSectionAndPageFromSelect("QuestionPage_2", "currentSectionId")
    ).toMatchObject({
      pageId: "2"
    });
  });

  it("should return current sectionId if value does not contain Section_", () => {
    expect(
      getSectionAndPageFromSelect("QuestionPage_2", "currentSectionId")
    ).toMatchObject({
      sectionId: "currentSectionId"
    });
  });

  it("should set pageId to null if value does not contain QuestionPage_", () => {
    expect(
      getSectionAndPageFromSelect("Section_1", "currentSectionId")
    ).toMatchObject({
      pageId: null
    });
  });
});
