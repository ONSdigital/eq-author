import React from "react";

import CreateQuestionnairePage from "./CreateQuestionnaire";
import { mountWithRouter } from "tests/utils/mountWithRouter";

let wrapper;

const historyPushFn = jest.fn();
const history = {
  push: historyPushFn
};

const handleChange = jest.fn;
const questionnaire = {
  description: "",
  legalBasis: "",
  theme: "",
  title: ""
};

describe("CreateQuestionnairePage", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <CreateQuestionnairePage
        loading={false}
        history={history}
        questionnaire={questionnaire}
        onUpdate={handleChange}
      />
    );
  });

  it("should render", () => {
    expect(wrapper.length).not.toBe(0);
  });

  it("should forward to `/design` when form is submitted", () => {
    wrapper.find("form").simulate("submit");
    expect(historyPushFn).toHaveBeenCalledWith("/design");
  });
});
