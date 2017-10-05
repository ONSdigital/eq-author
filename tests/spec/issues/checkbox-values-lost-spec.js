import { startAtHomepage } from "../../helper";
import { clickCreateQuestionnaire } from "../../pages/AuthorHome.page";
import {
  enterQuestionnaireDetails,
  clickCreateButton
} from "../../pages/CreateQuestionnaire.page";

import AnswerSelectorPage from "../../pages/AnswerSelector.page";
import CheckboxAnswerPage from "../../pages/CheckboxAnswer.page";

xdescribe("Issue 191 -", () => {
  beforeEach(() => {
    startAtHomepage();
    clickCreateQuestionnaire();
    enterQuestionnaireDetails(
      "Issue 191",
      "Checkbox values being lost",
      "default",
      "default",
      "Voluntary",
      true
    );
    clickCreateButton();
  });

  it("should retain option values when an existing option is changed and a new option is added", () => {
    AnswerSelectorPage.addAnswer().checkbox();
    CheckboxAnswerPage.setOption(0, "First")
      .addOption()
      .setOption(0, "Changed")
      .setOption(1, "Second")
      .addOption();

    expect(CheckboxAnswerPage.getOptionLabelValues()).toEqual([
      "Changed",
      "Second",
      ""
    ]);
  });
});
