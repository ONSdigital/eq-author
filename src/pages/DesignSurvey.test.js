import React from "react";

import { defaultState } from "reducers/survey/meta";
import DesignSurveyPage from "pages/DesignSurvey";

import { mountWithRouter } from "tests/utils/mountWithRouter";

describe("DesignSurveyPage", () => {
  it("should render", () => {
    const Page = mountWithRouter(
      <DesignSurveyPage
        meta={defaultState.meta}
        onChange={jest.fn()}
        clearSurvey={jest.fn()}
        deleteItem={jest.fn()}
      />
    );
    expect(Page.length).not.toBe(0);
  });
});
