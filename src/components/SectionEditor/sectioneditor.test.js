import React from "react";
import { mount } from "enzyme";
import SectionEditor from "components/SectionEditor";

describe("SectionEditor", () => {
  const section = {};

  it("should render", () => {
    expect(
      mount(<SectionEditor section={section} onChange={jest.fn()} />)
    ).toMatchSnapshot();
  });
});
