import { startsWith, replace } from "lodash";

const getSectionAndPageFromSelect = (value, currentSectionId) => {
  const sectionId = startsWith(value, "Section")
    ? replace(value, /^Section/, "")
    : currentSectionId;
  const pageId = startsWith(value, "QuestionPage")
    ? replace(value, /^QuestionPage/, "")
    : null;
  return {
    sectionId,
    pageId
  };
};

export default getSectionAndPageFromSelect;
