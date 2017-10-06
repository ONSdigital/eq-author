import React from "react";
import mountWithRouter from "tests/utils/mountWithRouter";
import QuestionnaireNav, { AddSectionBtn } from "components/QuestionnaireNav";

describe("QuestionnaireNav", () => {
  let wrapper,
    handleAddSection,
    handleAddPage,
    handleDeleteSection,
    handleDeletePage,
    sectionNav;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    const fakeResolvedPromise = args => {
      return {
        then(fn) {
          fn(args);
          return fakeResolvedPromise();
        },
        catch() {
          return fakeResolvedPromise();
        }
      };
    };
    handleAddSection = jest.fn(() => fakeResolvedPromise(questionnaire));
    handleAddPage = jest.fn(() => fakeResolvedPromise({ section }));
    handleDeleteSection = jest.fn();
    handleDeletePage = jest.fn();
    sectionNav = { scrollSectionIntoView: jest.fn() };

    wrapper = mountWithRouter(
      <QuestionnaireNav
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onAddSection={handleAddSection}
        onDeleteSection={handleDeleteSection}
        onDeletePage={handleDeletePage}
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

  it("should handle clicks on `create a new section`", () => {
    wrapper.find(AddSectionBtn).simulate("click");
    expect(handleAddSection).toHaveBeenCalledWith(questionnaire.id);
    expect(sectionNav.scrollSectionIntoView).toHaveBeenCalledWith(
      questionnaire.id
    );
  });

  it("should ", () => {
    wrapper.instance().handleAddPage(section.id);
    expect(handleAddPage).toHaveBeenCalledWith(section.id);
    expect(sectionNav.scrollSectionIntoView).toHaveBeenCalledWith(section.id);
  });
});
