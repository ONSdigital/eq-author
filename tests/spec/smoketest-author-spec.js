import { getPageTitle, startAtHomepage } from "../helper";
import { last } from "lodash";

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
  setSectionTitle,
  getFirstSectionTitle
} from "../pages/DesignQuestionnaire.page";

describe("eQ Author Smoketest", () => {
  const login = () => {
    browser.pause(100);
    expect(browser.getUrl()).toContain("/sign-in");
    browser.click("button*=Sign in");
    browser.pause(100);
  };

  beforeAll(() => {
    startAtHomepage();
    login();
  });

  it("should load the eQ author page", () => {
    expect(getPageTitle()).toEqual("Your Questionnaires - Author");
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
      login();
      clickCreateQuestionnaire();
    });

    it("should be possible to enter details for new questionnaire", () => {
      enterQuestionnaireDetails(
        "title",
        "description",
        "default",
        "StatisticsOfTradeAct",
        true
      );
      clickCreateButton();
      expect(onDesignQuestionnairePage()).toBe(true);
    });
  });

  describe("designing the questionnaire", () => {
    beforeAll(() => {
      startAtHomepage();
      login();
      clickCreateQuestionnaire();
      enterQuestionnaireDetails(
        "title",
        "description",
        "default",
        "StatisticsOfTradeAct",
        true
      );
      clickCreateButton();
    });

    it("should update navigation title when section title changed", () => {
      expect(getFirstSectionTitle()).toEqual("Section Title");

      setSectionTitle("My Section Title");
      browser.keys("Tab");

      browser.pause(300);

      expect(getFirstSectionTitle()).toEqual("My Section Title");
    });

    it("should create a new page when deleting only page in section", () => {
      const prevUrl = browser.getUrl();
      browser.click("[data-test='btn-delete']");

      // Find the delete button from the confirmation dialog.
      const deleteButtons = browser.elements("[data-test='btn-delete']").value;
      browser.elementIdClick(last(deleteButtons).ELEMENT);

      browser.waitUntil(
        () => prevUrl !== browser.getUrl(),
        5000,
        "expected navigation to new page within 5s"
      );
    });
  });
});
