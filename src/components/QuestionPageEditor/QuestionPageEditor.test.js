import { QPE } from "components/QuestionPageEditor";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import AnswerEditor from "components/AnswerEditor";
import React from "react";
import { shallow } from "enzyme";

describe("Question Page Editor", () => {
  let wrapper;

  let mockMutations;
  let page;

  beforeEach(() => {
    mockMutations = {
      onUpdateAnswer: jest.fn(),
      onUpdatePage: jest.fn(),
      onAddAnswer: jest.fn(),
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onDeleteAnswer: jest.fn(),
      onUpdateOption: jest.fn()
    };

    page = {
      id: 1,
      title: "",
      description: "",
      guidance: "",
      answers: [
        {
          id: 1,
          title: "First name",
          description: "",
          type: "TextField"
        },
        {
          id: 2,
          title: "Last name",
          description: "",
          type: "TextField"
        }
      ]
    };

    wrapper = shallow(<QPE {...mockMutations} page={page} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should delete the correct answer", () => {
    wrapper.find(AnswerEditor).first().simulate("deleteAnswer", 2);
    expect(mockMutations.onDeleteAnswer).toHaveBeenCalledWith(
      page.id,
      page.answers[1].id
    );
  });

  it("should add an answer with a type", () => {
    wrapper.find(AnswerTypeSelector).simulate("select", "Textfield");
    expect(mockMutations.onAddAnswer).toHaveBeenCalledWith("Textfield");
  });
});
