import { exists } from "../helper";

const createQuestionnaireButton = "#btn-create-questionnaire";

export const hasCreateQuestionnaireButton = () => {
  return exists(createQuestionnaireButton);
};

export const clickCreateQuestionnaire = () => {
  browser.click(createQuestionnaireButton);
};
