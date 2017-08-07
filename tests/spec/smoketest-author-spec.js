import { getPageTitle, startAtHomepage } from "../helper";

import {
  hasCreateQuestionnaireButton,
  clickCreateQuestionnaire
} from "../pages/AuthorHome.page";
import {
  onCreateQuestionnairePage,
  enterQuestionnaireDetails,
  clickCreateButton
} from "../pages/CreateQuestionnaire.page";
import {
  onDesignQuestionnairePage,
  navigationHasDefaultSectionTitle,
  setSectionTitle,
  getFirstSectionTitle
} from "../pages/DesignQuestionnaire.page";

describe("eQ Author Smoketest", () => {
  beforeAll(() => {
    startAtHomepage();
  });

  it("should load the eQ author page", () => {
    expect(getPageTitle()).toEqual("eQ Author Prototype");
  });

  it("should display button to create questionnaire", () => {
    expect(hasCreateQuestionnaireButton()).toEqual(true);
  });

  it("should take me to Questionnaire meta screen when createQuestionnire is clicked", () => {
    clickCreateQuestionnaire();

    expect(onCreateQuestionnairePage()).toEqual(true);
  });

  describe("creating a new questionnaire", () => {
    beforeAll(() => {
      startAtHomepage();
      clickCreateQuestionnaire();
    });

    it("should be possible to enter details for new questionnaire", () => {
      enterQuestionnaireDetails(
        "title",
        "description",
        "surveyId",
        "default",
        "StatisticsOfTradeAct",
        true
      );
      clickCreateButton();
      expect(onDesignQuestionnairePage()).toEqual(true);
    });
  });

  describe("designing the questionnaire", () => {
    beforeAll(() => {
      startAtHomepage();
      clickCreateQuestionnaire();
      enterQuestionnaireDetails(
        "title",
        "description",
        "surveyId",
        "default",
        "StatisticsOfTradeAct",
        true
      );
      clickCreateButton();
    });

    it("should update navigation title when section title changed", () => {
      expect(navigationHasDefaultSectionTitle()).toEqual(true);

      setSectionTitle("My Section Title");
      browser.keys("Tab");

      expect(getFirstSectionTitle()).toEqual("My Section Title");
    });
  });
});
