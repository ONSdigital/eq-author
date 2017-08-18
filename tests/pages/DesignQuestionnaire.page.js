export const onDesignQuestionnairePage = () => {
  const pageTitle = browser.getText("h2");

  return pageTitle === "QUESTIONNAIRE STRUCTURE";
};

export const navigationHasDefaultSectionTitle = () => {
  return navigationSectionHasTitle("Section Title");
};

export const navigationSectionHasTitle = title => {
  return getFirstSectionTitle() === title;
};

const sectionTitleInput = 'input[name="section.title"]';

export const setSectionTitle = sectionTitle => {
  browser.click(sectionTitleInput);
  browser.keys(sectionTitle);
};

export const getFirstSectionTitle = () => {
  return browser.getText("h3")[0];
};
