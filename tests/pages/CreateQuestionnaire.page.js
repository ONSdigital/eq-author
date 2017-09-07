export const onCreateQuestionnairePage = () => {
  const pageTitle = browser.getText("h1");
  return pageTitle === "Create a Questionnaire";
};

const questionnaireTitle = "#questionnaire\\.title";
const questionnaireDescription = "#questionnaire\\.description";
const questionnaireSurveyId = "#questionnaire\\.surveyId";
const questionnaireTheme = "#questionnaire\\.theme";
const questionnaireLegalBasis = "#questionnaire\\.legalBasis";
const questionnaireNavigation = "#questionnaire\\.navigation";
const createButton = 'button[type="submit"]';

export const enterQuestionnaireDetails = (
  title,
  description,
  surveyId,
  theme,
  legalBasis,
  navigationDesired
) => {
  browser.setValue(questionnaireTitle, title);
  browser.setValue(questionnaireDescription, description);
  browser.setValue(questionnaireSurveyId, surveyId);
  browser.selectByVisibleText(questionnaireTheme, theme);
  browser.selectByVisibleText(questionnaireLegalBasis, legalBasis);

  const isNavigationChecked = browser.isSelected(questionnaireNavigation);
  if (
    (isNavigationChecked && !navigationDesired) ||
    (!isNavigationChecked && navigationDesired)
  ) {
    browser.click(questionnaireNavigation);
  }
};

export const clickCreateButton = () => {
  browser.click(createButton);
};
