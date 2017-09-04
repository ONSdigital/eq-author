/* eslint-disable jest/no-disabled-tests */
import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import QuestionnaireDesign from "components/QuestionnaireDesign";
import QuestionnaireNav from "components/QuestionnaireNav";
import { shallow } from "enzyme";

let mockHandlers, wrapper;

let answer = {
  id: 1,
  label: "",
  options: [{ id: 1 }]
};

let page = {
  id: "1",
  description: "",
  guidance: "",
  title: "",
  type: "General",
  answers: [answer]
};

let section = { id: "2", title: "", pages: [page] };

let questionnaire = { id: "3", title: "hello world", sections: [section] };

describe("containers/QuestionnaireDesignPage", () => {
  beforeEach(() => {
    mockHandlers = {
      onUpdate: jest.fn(),
      onChange: jest.fn(),
      onSubmit: jest.fn(),
      onAddPage: jest.fn(),
      onAddAnswer: jest.fn(),
      onUpdatePage: jest.fn(),
      onUpdateAnswer: jest.fn(),
      onUpdateSection: jest.fn(),
      onUpdateOption: jest.fn(),
      onAddSection: jest.fn(),
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onDeletePage: jest.fn(),
      onDeleteAnswer: jest.fn()
    };

    const match = {
      params: {
        questionnaireId: "3",
        sectionId: "2",
        pageId: "1"
      }
    };

    wrapper = shallow(
      <QuestionnaireDesignPage
        {...mockHandlers}
        questionnaire={questionnaire}
        section={section}
        page={page}
        answers={page.answers}
        loading={false}
        match={match}
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

  it("should update state with when receiving props", () => {
    const section = { id: 4, title: "Section 2" };
    const page = { id: 5, title: "Page 2", type: "General" };
    wrapper.setProps({ section, page });

    expect(wrapper.state().section).toBe(section);
    expect(wrapper.state().page).toBe(page);
  });

  it("should store updated values in state", () => {
    wrapper.find(QuestionnaireDesign).simulate("change", {
      name: "section.title",
      value: "My Title"
    });
    expect(wrapper.state().section).toEqual(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should update Section when section field blurs", () => {
    wrapper
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "section.title",
        value: "My Title"
      })
      .simulate("blur", "section");

    expect(mockHandlers.onUpdateSection).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should update Page when page field blurs", () => {
    wrapper
      .setState({ focused: "page" })
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "page.title",
        value: "My Title"
      })
      .simulate("blur", "page");

    expect(mockHandlers.onUpdatePage).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should update Answer when page field blurs", () => {
    wrapper
      .setState({ focused: "answer-1" })
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "answers[0].label",
        value: "Label"
      })
      .simulate("blur", "answer");

    expect(mockHandlers.onUpdateAnswer).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Label" })
    );
  });

  it("should update Option when option field blurs", () => {
    wrapper
      .setState({ focused: "answer-1-option-1" })
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "answers[0].options[0].label",
        value: "Label"
      })
      .simulate("blur", "option");

    expect(mockHandlers.onUpdateOption).toHaveBeenCalledWith(
      expect.objectContaining({ label: "Label" })
    );
  });

  it("should not update when unknown field blurs", () => {
    wrapper
      .setState({ focused: null })
      .find(QuestionnaireDesign)
      .simulate("blur");

    expect(mockHandlers.onUpdatePage).not.toHaveBeenCalled();
    expect(mockHandlers.onUpdateSection).not.toHaveBeenCalled();
  });

  it("should set focus state when field receives focus", () => {
    wrapper.find(QuestionnaireDesign).simulate("focus", "page");

    expect(wrapper.state().focused).toBe("page");
  });

  it("should set focused element on blur", () => {
    wrapper.simulate("blur");
    expect(wrapper.state().focused).toEqual("section");
  });

  it("should set focused element on focus", () => {
    wrapper.simulate("focus");
    expect(wrapper.state().focused).toEqual("section");
  });

  it("should invoke callback when answer added", () => {
    wrapper.find(QuestionnaireDesign).simulate("addAnswer");
    expect(mockHandlers.onAddAnswer).toHaveBeenCalled();
  });

  xit("should invoke callback when answer deleted", () => {
    wrapper
      .setState({ focused: null })
      .find(QuestionnaireDesign)
      .simulate("deleteAnswer");

    expect(mockHandlers.onDeleteAnswer).toHaveBeenCalled();
  });

  xit("should pass onAddPage prop to QuestionNav", () => {
    wrapper.find(QuestionnaireNav).simulate("addPage", 1);
    expect(mockHandlers.onAddPage).toHaveBeenCalledWith(1);
  });

  xit("should pass onAddSection prop to QuestionNav", () => {
    wrapper.find(QuestionnaireNav).simulate("addSection");
    expect(mockHandlers.onAddSection).toHaveBeenCalledWith(questionnaire.id);
  });

  xit("should invoke callback when option deleted", () => {
    wrapper.find(QuestionnaireDesign).simulate("deleteOption", 1, 1);
    expect(mockHandlers.onDeleteOption).toHaveBeenCalledWith(1, 1);
  });

  xit("should invoke callback when option added", () => {
    wrapper.find(QuestionnaireDesign).simulate("addOption", 1);
    expect(mockHandlers.onAddOption).toHaveBeenCalledWith(1);
  });
});
