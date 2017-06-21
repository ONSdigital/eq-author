import React from "react";

import DesignQuestionnairePage from "./DesignQuestionnaire";

import { mountWithRouter } from "tests/utils/mountWithRouter";

describe("DesignQuestionnairePage", () => {
  it("should render", () => {
    const Page = mountWithRouter(
      <DesignQuestionnairePage
        onChange={jest.fn()}
        clearQuestionnaire={jest.fn()}
        deleteItem={jest.fn()}
      />
    );
    expect(Page.length).not.toBe(0);
  });
});
