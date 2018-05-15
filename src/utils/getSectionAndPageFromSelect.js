import { startsWith, replace } from "lodash";

const getSectionAndPageFromSelect = (value, currentSectionId) => {
  const sectionId = startsWith(value, "Section_")
    ? replace(value, /^Section_/, "")
    : currentSectionId;
  const pageId = startsWith(value, "QuestionPage_")
    ? replace(value, /^QuestionPage_/, "")
    : null;
  return {
    sectionId,
    pageId
  };
};

export default getSectionAndPageFromSelect;
