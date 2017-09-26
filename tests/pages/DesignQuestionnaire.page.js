export const onDesignQuestionnairePage = () => {
  browser.waitForExist("#questionnaire-nav");
  return true;
};

export const navigationHasDefaultSectionTitle = () => {
  return navigationSectionHasTitle("Section Title");
};

export const navigationSectionHasTitle = title => {
  return getFirstSectionTitle() === title;
};

const sectionTitleInput = "#section-editor [aria-label='title']";

export const setSectionTitle = sectionTitle => {
  browser.click(sectionTitleInput);
  browser.keys(sectionTitle.split(""));
};

export const getFirstSectionTitle = () => {
  const navigationSectionTitleSelector = "h3[class*='SectionTitle']";
  browser.waitForExist(navigationSectionTitleSelector);
  return browser.getText(navigationSectionTitleSelector);
};
