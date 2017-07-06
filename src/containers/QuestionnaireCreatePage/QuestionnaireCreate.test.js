import React from "react";
import { shallow } from "enzyme";
import QuestionnaireCreate from "./QuestionnaireCreate";

let wrapper;
const createQuestionnaire = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({ data: { createQuestionnaire: { id: 2 } } });
  });
});

const createSection = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({ data: {} });
  });
});

const history = {
  push: jest.fn()
};

describe("containers/QuestionnaireCreate", () => {
  beforeEach(() => {
    wrapper = shallow(
      <QuestionnaireCreate
        createQuestionnaire={createQuestionnaire}
        createSection={createSection}
        history={history}
        loading
      />
    );
  });

  it("should call createQuestionnaire when submitted", () => {
    const preventDefault = jest.fn();
    return wrapper.instance().handleSubmit({ preventDefault }).then(() => {
      expect(preventDefault).toHaveBeenCalled();
      expect(createQuestionnaire).toHaveBeenCalled();
    });
  });

  it("should update state with questionnaire data when received as props", () => {
    const questionnaire = { title: "My Questionnaire" };
    wrapper.setProps({ questionnaire });
    expect(wrapper.state()).toMatchObject(questionnaire);
  });

  it("should store updated values in state", () => {
    const value = { name: "questionnaire.title", value: "My Title" };
    wrapper.instance().handleChange(value);
    expect(wrapper.state().questionnaire.title).toEqual("My Title");
  });
});
