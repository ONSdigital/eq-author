import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import { shallow } from "enzyme";

describe("QuestionnaireDesignPage", () => {
  let mockHandlers;
  let wrapper;

  const answer = {
    id: "1",
    label: "",
    options: [{ id: "1" }]
  };

  const page = {
    id: "1",
    description: "",
    guidance: "",
    title: "",
    type: "General",
    answers: [answer]
  };

  const section = {
    id: "2",
    title: "",
    pages: [page]
  };

  const questionnaire = {
    id: "3",
    title: "hello world",
    sections: [section]
  };

  beforeEach(() => {
    mockHandlers = {
      onUpdateSection: jest.fn(),
      onAddPage: jest.fn(),
      onUpdatePage: jest.fn(),
      onDeletePage: jest.fn(),
      onDeleteSection: jest.fn()
    };

    wrapper = shallow(
      <QuestionnaireDesignPage
        {...mockHandlers}
        questionnaire={questionnaire}
        questionnaireId={questionnaire.id}
        section={section}
        page={page}
        pageId={page.id}
        sectionId={section.id}
        loading={false}
      />
    );
  });

  it("should render nothing when loading", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render form when loaded", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onAddPage when add question page button clicked", () => {
    wrapper.find("IconButton").simulate("click");
    expect(mockHandlers.onAddPage).toHaveBeenCalledWith(section.id);
  });
});
