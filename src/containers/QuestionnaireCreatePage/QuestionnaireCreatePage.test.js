import React from "react";
import { shallow } from "enzyme";
import QuestionnaireCreatePage from "containers/QuestionnaireCreatePage/QuestionnaireCreatePage";
import QuestionnaireMeta from "components/QuestionnaireMeta";

let wrapper;
const createQuestionnaire = jest.fn(() =>
  Promise.resolve({ data: { createQuestionnaire: { id: 2 } } })
);

const createSection = jest.fn(() =>
  Promise.resolve({ data: { createSection: { id: 2 } } })
);

const createPage = jest.fn(() => Promise.resolve({ data: {} }));

const history = {
  push: jest.fn()
};

describe("containers/QuestionnaireCreate", () => {
  beforeEach(() => {
    wrapper = shallow(
      <QuestionnaireCreatePage
        createQuestionnaire={createQuestionnaire}
        createSection={createSection}
        createPage={createPage}
        history={history}
        loading
      />
    );
  });

  it("should call createQuestionnaire and createSection when submitted", () => {
    const preventDefault = jest.fn();
    return wrapper
      .instance()
      .handleSubmit({ preventDefault })
      .then(() => {
        expect(preventDefault).toHaveBeenCalled();
        expect(createQuestionnaire).toHaveBeenCalled();
      })
      .then(() => {
        expect(createSection).toHaveBeenCalled();
      })
      .then(() => {
        expect(createPage).toHaveBeenCalled();
      });
  });

  it("should update state with questionnaire data when received as props", () => {
    const questionnaire = { title: "My Questionnaire" };
    wrapper.setProps({ questionnaire });
    expect(wrapper.state()).toMatchObject(questionnaire);
  });

  it("should store updated values in state", () => {
    wrapper.find(QuestionnaireMeta).simulate("change", {
      name: "questionnaire.title",
      value: "My Title"
    });
    expect(wrapper.state().questionnaire.title).toEqual("My Title");
  });
});