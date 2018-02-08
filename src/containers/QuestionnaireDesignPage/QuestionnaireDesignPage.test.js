import React from "react";
import QuestionnaireDesignPage from "./QuestionnaireDesignPage";
import { shallow } from "enzyme";
import { omit } from "lodash";

const createWrapper = (props, render = shallow) => {
  return render(<QuestionnaireDesignPage {...props} />);
};

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

  let props;

  beforeEach(() => {
    mockHandlers = {
      onUpdateSection: jest.fn(),
      onAddPage: jest.fn(),
      onUpdatePage: jest.fn(),
      onDeletePage: jest.fn()
    };

    props = {
      ...mockHandlers,
      answer,
      page,
      section,
      questionnaire,
      questionnaireId: questionnaire.id,
      sectionId: section.id,
      pageId: page.id,
      loading: false
    };
    wrapper = createWrapper(props, shallow);
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

  describe("redirect behaviour", () => {
    it("should redirect to a 404 page if questionnaire is undefined", () => {
      wrapper = createWrapper(omit(props, "questionnaire"));
      expect(wrapper).toMatchSnapshot();
    });

    it("should redirect to a 404 page if questionnaire, section is undefined", () => {
      wrapper = createWrapper(omit(props, "questionnaire", "section"));
      expect(wrapper).toMatchSnapshot();
    });

    it("should redirect to a 404 page if questionnaire, section and page is undefined", () => {
      wrapper = createWrapper(omit(props, "questionnaire", "section", "page"));
      expect(wrapper).toMatchSnapshot();
    });
  });
});
