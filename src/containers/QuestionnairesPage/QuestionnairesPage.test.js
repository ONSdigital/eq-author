import React from "react";
import Questionnaires from "./QuestionnairesPage";
import mountWithRouter from "tests/utils/mountWithRouter";

let wrapper;

describe("containers/Questionnaires", () => {
  beforeEach(() => {
    const questionnaires = [];
    wrapper = mountWithRouter(
      <Questionnaires
        questionnaires={questionnaires}
        onDeleteQuestionnaire={jest.fn()}
      />
    );
  });

  it("should render a 'Create Questionnaire' button", () => {
    expect(wrapper.find("#btn-create-questionnaire").length).toBeTruthy();
  });
});
