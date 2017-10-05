import { shallow } from "enzyme";
import PageNav from "./PageNav";
import SectionNavItem, {
  AddPageBtn,
  SectionDeleteButton,
  LinkedSectionTitle
} from "./SectionNavItem";
import React from "react";

describe("SectionNavItem", () => {
  let wrapper;
  let handleAddPage, handleDeleteSection, handleDeletePage;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn();
    handleDeleteSection = jest.fn();
    handleDeletePage = jest.fn();

    wrapper = shallow(
      <SectionNavItem
        questionnaire={questionnaire}
        section={section}
        onAddPage={handleAddPage}
        onDeleteSection={handleDeleteSection}
        onDeletePage={handleDeletePage}
        duration={123}
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

  it("should allow sections to be deleted", () => {
    const style = { height: 100 };
    const getBoundingClientRect = jest.fn(() => style);

    wrapper.instance().saveRef({ getBoundingClientRect });
    wrapper.find(SectionDeleteButton).simulate("click");

    expect(getBoundingClientRect).toHaveBeenCalled();
    expect(wrapper.state("style")).toEqual(style);
    expect(handleDeleteSection).toHaveBeenCalledWith(section.id);
  });

  it("should allow pages to be deleted", () => {
    wrapper.find(PageNav).simulate("delete");
    expect(handleDeletePage).toHaveBeenCalled();
  });

  describe("LinkedSectionTitle", () => {
    it("should render link when section has pages", () => {
      const result = shallow(
        <LinkedSectionTitle questionnaire={questionnaire} section={section} />
      );

      expect(result).toMatchSnapshot();
    });

    it("should render without link when section has no pages", () => {
      section.pages = [];
      const result = shallow(
        <LinkedSectionTitle questionnaire={questionnaire} section={section} />
      );

      expect(result).toMatchSnapshot();
    });
  });
});
