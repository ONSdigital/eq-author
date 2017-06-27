import React from "react";
import PropTypes from "prop-types";
import { mountWithRouter } from "tests/utils/mountWithRouter";

import createRouterContext from "react-router-test-context";

import { mount } from "enzyme";
import QuestionnaireCreate from "containers/QuestionnaireCreatePage/QuestionnaireCreate";

let wrapper;
const createQuestionnaire = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve({ data: { createQuestionnaire: { id: 2 } } });
  });
});

const history = {
  push: jest.fn()
};

describe("containers/QuestionnaireCreate", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <QuestionnaireCreate
        createQuestionnaire={createQuestionnaire}
        history={history}
        loading
      />
    );
  });

  it("should call createQuestionnaire when submitted", () => {
    const preventDefault = jest.fn();
    return wrapper.instance().onSubmit({ preventDefault }).then(() => {
      expect(preventDefault).toHaveBeenCalled();
      expect(createQuestionnaire).toHaveBeenCalled();
      expect(history.push).toHaveBeenCalledWith(expect.stringContaining("2"));
    });
  });

  it("should update state with questionnaire data when received as props", () => {
    const questionnaire = { title: "My Questionnaire" };
    wrapper.setProps({ questionnaire });
    expect(wrapper.state()).toMatchObject(questionnaire);
  });

  it("should store updated values in state", () => {
    const value = { title: "My Title" };
    wrapper.instance().onChange(value);
    expect(wrapper.state()).toMatchObject(value);
  });
});
