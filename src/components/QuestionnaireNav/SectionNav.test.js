import React from "react";
import { shallow } from "enzyme";
import SectionNav, { AddPageBtn, LinkedSectionTitle } from "./SectionNav";

describe("SectionNav", () => {
  let wrapper, handleAddPage, handleDeletePage;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn();
    handleDeletePage = jest.fn();
    wrapper = shallow(
      <SectionNav
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle 'add page' button clicks", () => {
    wrapper.find(AddPageBtn).simulate("click");
    expect(handleAddPage).toHaveBeenCalledWith(section.id);
  });

  describe("LinkedSectionHeader", () => {
    it("should render when section has pages", () => {
      section.pages = [page];
      const result = shallow(
        <LinkedSectionTitle questionnaire={questionnaire} section={section} />
      );
      expect(result).toMatchSnapshot();
    });

    it("should render when section has no pages", () => {
      section.pages = [];
      const result = shallow(
        <LinkedSectionTitle questionnaire={questionnaire} section={section} />
      );
      expect(result).toMatchSnapshot();
    });
  });
});
