import React from "react";
import { mount } from "enzyme";
import SectionEditor from "./index";

describe("SectionEditor", () => {
  it("should render", () => {
    expect(
      mount(
        <SectionEditor
          onChange={jest.fn()}
          sectionTitle="Title"
          sectionDescription="Description"
        />
      )
    ).toMatchSnapshot();
  });
});
