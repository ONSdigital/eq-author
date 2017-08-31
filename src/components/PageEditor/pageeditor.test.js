import React from "react";
import { mount } from "enzyme";
import PageEditor from "./index";

describe("Page Editor", () => {
  it("should render", () => {
    expect(
      mount(
        <PageEditor
          onChange={jest.fn()}
          pageTitle="Page title"
          pageTitleRef={jest.fn()}
          pageDescription="Page description"
          pageGuidance="Page guidance"
        />
      )
    ).toMatchSnapshot();
  });
});
