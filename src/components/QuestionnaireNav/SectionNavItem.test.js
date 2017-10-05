import React from "react";
import { shallow } from "enzyme";
import SectionNavItem from "./SectionNavItem";

describe("SectionNav", () => {
  let wrapper, saveSectionItemRef;
  const section = { id: "1", title: "Section 1" };

  beforeEach(() => {
    saveSectionItemRef = jest.fn();

    wrapper = shallow(
      <SectionNavItem section={section} saveSectionItemRef={saveSectionItemRef}>
        Section Title
      </SectionNavItem>
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
