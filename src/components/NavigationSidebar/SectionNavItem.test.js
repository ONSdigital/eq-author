import { shallow } from "enzyme";
import SectionNavItem, {
  AddPageBtn,
  SectionDeleteButton
} from "./SectionNavItem";
import React from "react";

describe("SectionNavItem", () => {
  let wrapper, handleAddPage, handleDeleteSection, saveSectionItemRef;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn(() => Promise.resolve);
    handleDeleteSection = jest.fn();
    saveSectionItemRef = jest.fn();

    wrapper = shallow(
      <SectionNavItem
        questionnaire={questionnaire}
        section={section}
        onAddPage={handleAddPage}
        onDeleteSection={handleDeleteSection}
        saveSectionItemRef={saveSectionItemRef}
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

  it("saveSectionItemRef", () => {
    const elem = shallow(<div />);
    wrapper.instance().saveRef(elem);
    expect(saveSectionItemRef).toHaveBeenCalledWith(section.id, elem);
  });

  describe("Fix keyboard focus scrolling", () => {
    it("should set the scrollLeft to 0", () => {
      const elem = shallow(<div />);
      wrapper.instance().saveRef(elem);
      wrapper.find(SectionDeleteButton).simulate("focus");
      expect(wrapper.instance().elem.scrollLeft).toEqual(0);
    });
  });
});
