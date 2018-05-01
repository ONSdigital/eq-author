import { QPE } from "components/QuestionPageEditor";

import React from "react";
import { shallow } from "enzyme";

describe("Question Page Editor", () => {
  let wrapper;

  let mockMutations;
  let page;
  let section;
  let questionnaire;

  const answer = {
    id: "123",
    __typename: "Answer"
  };

  beforeEach(() => {
    mockMutations = {
      onUpdateAnswer: jest.fn(),
      onUpdatePage: jest.fn(),
      onDeletePage: jest.fn(),
      onAddAnswer: jest.fn(() => Promise.resolve(answer)),
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onDeleteAnswer: jest.fn(),
      onUpdateOption: jest.fn(),
      onFocus: jest.fn(),
      onMovePage: jest.fn(),
      onAddOther: jest.fn(),
      onDeleteOther: jest.fn()
    };

    page = {
      __typename: "Page",
      id: "1",
      title: "",
      description: "",
      guidance: "",
      answers: [
        {
          __typename: "BasicAnswer",
          id: "1",
          title: "First name",
          description: "",
          type: "TextField"
        },
        {
          __typename: "BasicAnswer",
          id: "2",
          title: "Last name",
          description: "",
          type: "TextField"
        }
      ]
    };

    section = {
      id: "3",
      pages: [page]
    };

    questionnaire = {
      id: "1",
      __typename: "Questionnaire",
      sections: [section]
    };

    wrapper = shallow(
      <QPE
        {...mockMutations}
        questionnaire={questionnaire}
        page={page}
        section={section}
      />
    );
  });

  it("should delete the correct answer", () => {
    wrapper
      .find("[data-test='answer-editor']")
      .first()
      .simulate("deleteAnswer", page.answers[0].id);

    expect(mockMutations.onDeleteAnswer).toHaveBeenCalledWith(
      page.id,
      page.answers[0].id
    );
  });

  it("should add an answer with a type", () => {
    wrapper.find("[data-test='add-answer']").simulate("select", "Textfield");
    expect(mockMutations.onAddAnswer).toHaveBeenCalledWith("Textfield");
  });

  it("should handle deleting pages from a section", () => {
    const deletePage = wrapper.find("[data-test='delete-page']");
    deletePage.simulate("delete");

    expect(mockMutations.onDeletePage).toHaveBeenCalledWith(
      section.id,
      page.id
    );
  });
});
