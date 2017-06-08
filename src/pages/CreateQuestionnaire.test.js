import React from "react";

import { defaultState } from "reducers/questionnaire/meta";
import CreateQuestionnairePage from "./CreateQuestionnaire";

import { mountWithRouter } from "tests/utils/mountWithRouter";

let wrapper;
const changeHandler = jest.fn();

describe("CreateQuestionnairePage", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <CreateQuestionnairePage meta={defaultState} onChange={changeHandler} />
    );
  });

  it("should render", () => {
    expect(wrapper.length).not.toBe(0);
  });

  it("should call onChange handler when a field is changed", () => {
    const titleField = wrapper.find("#title");
    titleField.simulate("change", { target: { value: "Hello" } });

    expect(changeHandler).toHaveBeenCalled();
  });
});
