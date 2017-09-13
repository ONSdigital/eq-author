import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import EditorSurface from "components/EditorSurface";
import { shallow } from "enzyme";

describe("QuestionnaireDesignPage", () => {
  let mockHandlers;
  let wrapper;

  const answer = {
    id: 1,
    label: "",
    options: [{ id: 1 }]
  };

  const page = {
    id: 1,
    description: "",
    guidance: "",
    title: "",
    type: "General",
    answers: [answer]
  };

  const section = {
    id: 2,
    title: "",
    pages: [page]
  };

  const questionnaire = {
    id: 3,
    title: "hello world",
    sections: [section]
  };

  beforeEach(() => {
    mockHandlers = {
      onUpdateSection: jest.fn(),
      onUpdatePage: jest.fn()
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

  it("should track focused item", () => {
    wrapper.find(EditorSurface).simulate("focus", "option");
    expect(wrapper.state("focused")).toBe("option");
  });
});
