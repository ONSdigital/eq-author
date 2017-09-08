export const onCreateQuestionnairePage = () => {
  const pageTitle = browser.getText("h1");
  return pageTitle === "Create a Questionnaire";
};

const questionnaireTitle = "#title";
const questionnaireDescription = "#description";
const questionnaireSurveyId = "#surveyId";
const questionnaireTheme = "#theme";
const questionnaireLegalBasis = "#legalBasis";
const questionnaireNavigation = "#navigation";
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
