export const onDesignQuestionnairePage = () => {
  const navigationHeadingSelector = "h2";
  browser.waitForExist(navigationHeadingSelector);
  return (
    browser.getText(navigationHeadingSelector) === "QUESTIONNAIRE STRUCTURE"
  );
};

export const navigationHasDefaultSectionTitle = () => {
  return navigationSectionHasTitle("Section Title");
};

export const navigationSectionHasTitle = title => {
  return getFirstSectionTitle() === title;
};

const sectionTitleInput = "#section-editor [name='title']";

export const setSectionTitle = sectionTitle => {
  browser.setValue(sectionTitleInput, sectionTitle);
};

export const getFirstSectionTitle = () => {
  const navigationSectionTitleSelector = "h3";
  browser.waitForExist(navigationSectionTitleSelector);
  return browser.getText(navigationSectionTitleSelector)[0];
};
