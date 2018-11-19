import {
  buildQuestionnairePath,
  buildSectionPath,
  buildPagePath,
  buildDesignPath,
  buildPreviewPath,
  buildRoutingPath
} from "utils/UrlUtils";

const questionnaireId = "1";
const sectionId = "2";
const pageId = "3";

describe("buildQuestionnairePath", () => {
  it("builds a valid path", () => {
    const path = buildQuestionnairePath({ questionnaireId });
    expect(path).toEqual("/questionnaire/1");
  });

  it("throws if questionnaireId not supplied", () => {
    expect(() => buildQuestionnairePath({})).toThrow();
  });
});

describe("buildSectionPath", () => {
  it("builds a valid path", () => {
    const path = buildSectionPath({ questionnaireId, sectionId });
    expect(path).toEqual("/questionnaire/1/2/design");
  });

  it("throws if any param not supplied", () => {
    expect(() => buildSectionPath({})).toThrow();
    expect(() => buildSectionPath({ questionnaireId })).toThrow();
    expect(() => buildSectionPath({ sectionId })).toThrow();
  });
});

describe("buildPagePath", () => {
  it("builds a valid path", () => {
    const path = buildPagePath({
      questionnaireId,
      sectionId,
      pageId
    });
    expect(path).toEqual("/questionnaire/1/2/3/design");
  });

  it("throws if any param not supplied", () => {
    expect(() => buildPagePath({})).toThrow();
    expect(() => buildPagePath({ questionnaireId })).toThrow();
    expect(() => buildPagePath({ questionnaireId, sectionId })).toThrow();
    expect(() => buildPagePath({ questionnaireId, pageId })).toThrow();
    expect(() => buildPagePath({ sectionId, pageId })).toThrow();
  });
});

describe("buildDesignPath", () => {
  it("builds a page design path", () => {
    const path = buildDesignPath({
      questionnaireId,
      sectionId,
      pageId,
      tab: "routing"
    });
    expect(path).toEqual("/questionnaire/1/2/3/design");
  });

  it("builds a confirmation design path", () => {
    const path = buildDesignPath({
      questionnaireId,
      sectionId,
      pageId,
      confirmationId: 4,
      tab: "preview"
    });
    expect(path).toEqual("/questionnaire/1/2/3/4/design");
  });
});

describe("buildPreviewPath", () => {
  it("builds a section preview path", () => {
    const path = buildPreviewPath({
      questionnaireId,
      sectionId,
      tab: "design"
    });
    expect(path).toEqual("/questionnaire/1/2/preview");
  });

  it("builds a page preview path", () => {
    const path = buildPreviewPath({
      questionnaireId,
      sectionId,
      pageId,
      tab: "routing"
    });
    expect(path).toEqual("/questionnaire/1/2/3/preview");
  });
});

describe("buildRoutingPath", () => {
  it("builds a page routing path", () => {
    const path = buildRoutingPath({
      questionnaireId,
      sectionId,
      pageId,
      tab: "design"
    });
    expect(path).toEqual("/questionnaire/1/2/3/routing");
  });
});
