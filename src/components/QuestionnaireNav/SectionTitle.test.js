import { shallow } from "enzyme";

import SectionTitle from "./SectionTitle";
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

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("SectionTitle", () => {
    it("should render link when section has pages", () => {
      const result = shallow(
        <SectionTitle questionnaire={questionnaire} section={section} />
      );

      expect(result).toMatchSnapshot();
    });

    it("should render without link when section has no pages", () => {
      section.pages = [];
      const result = shallow(
        <SectionTitle questionnaire={questionnaire} section={section} />
      );

      expect(result).toMatchSnapshot();
    });
  });
});
