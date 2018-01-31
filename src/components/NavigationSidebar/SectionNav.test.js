import React from "react";
import { shallow } from "enzyme";
import SectionNav from "./SectionNav";

describe("SectionNav", () => {
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
      <SectionNav
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onDeleteSection={handleDeleteSection}
        onDeletePage={handleDeletePage}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call after a delay scrollSectionIntoView", () => {
    const scrollIntoView = jest.fn();

    wrapper.instance().saveSectionItemRef(section.id, { scrollIntoView });
    wrapper.instance().scrollSectionIntoView(section.id);
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
      inline: "start"
    });
  });
});
