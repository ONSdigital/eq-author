import React from "react";

import { defaultState } from "reducers/survey";
import CreateSurveyPage from "./CreateSurvey";

import { mountWithRouter } from "tests/utils/mountWithRouter";

describe("CreateSurveyPage", () => {
  it("should render", () => {
    const Page = mountWithRouter(<CreateSurveyPage meta={defaultState.meta} />);
    expect(Page.length).not.toBe(0);
  });

  it("should call onChange handler when a field is changed", () => {
    const changeHandler = jest.fn();
    const Page = mountWithRouter(
      <CreateSurveyPage meta={defaultState.meta} onChange={changeHandler} />
    );

    const titleField = Page.find("#title");
    titleField.simulate("change", { target: { value: "Hello" } });

    expect(changeHandler).toHaveBeenCalled();
  });
});
