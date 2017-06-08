import React from "react";

import { defaultState } from "reducers/questionnaire/meta";
import CreateQuestionnairePage from "./CreateQuestionnaire";

import { mountWithRouter } from "tests/utils/mountWithRouter";

describe("CreateQuestionnairePage", () => {
  it("should render", () => {
    const Page = mountWithRouter(
      <CreateQuestionnairePage meta={defaultState} onChange={jest.fn()} />
    );

    expect(Page.length).not.toBe(0);
  });

  it("should call onChange handler when a field is changed", () => {
    const changeHandler = jest.fn();
    const Page = mountWithRouter(
      <CreateQuestionnairePage meta={defaultState} onChange={changeHandler} />
    );

    const titleField = Page.find("#title");
    titleField.simulate("change", { target: { value: "Hello" } });

    expect(changeHandler).toHaveBeenCalled();
  });
});
