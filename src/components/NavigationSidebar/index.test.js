import React from "react";
import { shallow } from "enzyme";
import NavigationSidebar, { AddSectionBtn } from "components/NavigationSidebar";
import { SynchronousPromise } from "synchronous-promise";
import SectionNav from "components/NavigationSidebar/SectionNav";

describe("NavigationSidebar", () => {
  let wrapper,
    handleAddSection,
    handleAddPage,
    sectionNav,
    handleUpdateQuestionnaire;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddSection = jest.fn(() => SynchronousPromise.resolve(questionnaire));
    handleAddPage = jest.fn(() => SynchronousPromise.resolve({ section }));
    handleUpdateQuestionnaire = jest.fn();
    sectionNav = { scrollSectionIntoView: jest.fn() };

    wrapper = shallow(
      <NavigationSidebar
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onAddSection={handleAddSection}
        onUpdateQuestionnaire={handleUpdateQuestionnaire}
      />
    );

    wrapper.instance().saveSectionNavRef(sectionNav);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should store a reference to the SectionNav instance", () => {
    expect(wrapper.instance().sectionNav).toEqual(sectionNav);
  });

  it("should allow sections to be added", () => {
    wrapper.find(AddSectionBtn).simulate("click");
    expect(handleAddSection).toHaveBeenCalledWith(questionnaire.id);
    expect(sectionNav.scrollSectionIntoView).toHaveBeenCalledWith(
      questionnaire.id
    );
  });

  it("should allow pages to be added", () => {
    wrapper.find(SectionNav).simulate("addPage", section.id);
    expect(handleAddPage).toHaveBeenCalledWith(section.id);
    expect(sectionNav.scrollSectionIntoView).toHaveBeenCalledWith(section.id);
  });
});
