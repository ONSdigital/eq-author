export const onCreateQuestionnairePage = () => {
  const pageTitle = browser.getText("h1");
  return pageTitle === "Create a Questionnaire";
};

const questionnaireTitle = "#title";
const questionnaireDescription = "#description";
const questionnaireTheme = "#theme";
const questionnaireLegalBasis = "#legalBasis";
const navigationToggle = "label[for='navigation']";
const navigationCheckbox = "#navigation";
const createButton = 'button[type="submit"]';

export const enterQuestionnaireDetails = (
  title,
  description,
  theme,
  legalBasis,
  navigationDesired
) => {
  browser.setValue(questionnaireTitle, title);
  browser.setValue(questionnaireDescription, description);
  browser.selectByVisibleText(questionnaireTheme, theme);
  browser.selectByVisibleText(questionnaireLegalBasis, legalBasis);

  const isNavigationChecked = browser.isSelected(navigationCheckbox);
  if (
    (isNavigationChecked && !navigationDesired) ||
    (!isNavigationChecked && navigationDesired)
  ) {
    browser.click(navigationToggle);
  }
};

export const clickCreateButton = () => {
  browser.click(createButton);
};
