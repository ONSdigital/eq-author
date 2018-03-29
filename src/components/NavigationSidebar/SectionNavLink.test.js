import { shallow } from "enzyme";

import { UnwrappedSectionNavLink as SectionNavLink } from "./SectionNavLink";
import React from "react";

describe("SectionNavItem", () => {
  let wrapper;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  const props = {
    questionnaire,
    section,
    match: {
      params: {
        questionnaireId: questionnaire.id,
        sectionId: section.id,
        pageId: page.id
      }
    }
  };

  it("should render with pages", () => {
    wrapper = shallow(<SectionNavLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render without link when section has no pages", () => {
    section.pages = [];
    wrapper = shallow(<SectionNavLink {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
