import React from "react";
import { mount } from "enzyme";
import SectionEditor from "./index";

describe("SectionEditor", () => {
  const render = component =>
    <component
      onChange={jest.fn()}
      sectionTitle="Title"
      sectionDescription="Description"
    />;

  it("should render", () => {
    expect(render(SectionEditor)).toMatchSnapshot();
  });
});
