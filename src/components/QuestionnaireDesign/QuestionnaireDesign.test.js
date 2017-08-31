import React from "react";
import { mount, shallow } from "enzyme";
import QuestionnaireDesign from "./";
import AnswerTypeSelector from "components/AnswerTypeSelector";
import DeleteButton from "components/DeleteButton";
import Answer from "components/Answer";

const option = {
  id: 0,
  label: "",
  description: ""
};

const answer = {
  id: 1,
  options: [option]
};

const page = {
  id: 2,
  title: "",
  answers: [answer]
};

const section = {
  id: 3,
  title: "",
  pages: [page]
};

// eslint-disable-next-line jest/no-disabled-tests
xdescribe("QuestionnaireDesign", () => {
  let wrapper, mockHandlers;
  const createWrapper = (props, render = mount) => {
    return render(
      <QuestionnaireDesign
        {...mockHandlers}
        focused={null}
        section={section}
        page={page}
        answers={[answer]}
        {...props}
      />
    );
  };

  beforeEach(() => {
    mockHandlers = {
      onChange: jest.fn(),
      onAddAnswer: jest.fn(),
      onDeleteAnswer: jest.fn(),
      onAddOption: jest.fn(),
      onDeleteOption: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
    wrapper = createWrapper();
  });

  it("should render", () => {
    wrapper = createWrapper({}, shallow);

    expect(wrapper).toMatchSnapshot();
  });

  it("should fail invalid 'focused' prop value", () => {
    expect(() => {
      createWrapper({
        focused: "I AM NOT A VALID VALUE"
      });
    }).toThrow();
  });

  it("should focus on empty section title upon mount", () => {
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should focus on empty page title when section title is not empty", () => {
    wrapper = createWrapper({
      section: { title: "Section" },
      page: { id: "3", title: "" },
      answers: [answer]
    });
    expect(document.activeElement.name).toEqual("page.title");
  });

  it("should move focus to empty section title upon navigation to new page", () => {
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should move focus to empty page title upon navigation to new page", () => {
    wrapper = createWrapper({
      section: { title: "Section" },
      page: { id: "1", title: "I have a title" },
      answers: [answer]
    });

    expect(document.activeElement.name).toEqual("section.title");

    wrapper.setProps({ page: { id: "2", title: "" } });

    expect(document.activeElement.name).toEqual("page.title");
    expect(document.activeElement.value).toEqual("");
  });

  it("should have a delete button per answer", () => {
    wrapper = createWrapper({
      section: { title: "" },
      page: { id: "1", title: "" },
      answers: [
        {
          id: "1"
        },
        {
          id: "2"
        }
      ]
    });

    expect(wrapper.find(DeleteButton).nodes).toHaveLength(2);
  });

  it("should call handler when answer deleted", () => {
    wrapper = createWrapper({
      section: { title: "" },
      page: { id: "1", title: "" },
      answers: [
        {
          id: 1
        }
      ]
    });

    wrapper.find(DeleteButton).simulate("click");
    expect(wrapper.prop("onDeleteAnswer")).toHaveBeenCalledWith(1);
  });

  it("should delete the correct answer", () => {
    wrapper = createWrapper({
      section: { title: "" },
      page: { id: "1", title: "" },
      answers: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    });

    wrapper.find(DeleteButton).last().simulate("click");
    expect(wrapper.prop("onDeleteAnswer")).toHaveBeenCalledWith(2);
  });

  it("should add an answer with a type", () => {
    wrapper = createWrapper({}, shallow);
    wrapper.find(AnswerTypeSelector).simulate("select", "Textfield");
    expect(mockHandlers.onAddAnswer).toHaveBeenCalledWith("Textfield");
  });

  it("should add an option to answer via `id`", () => {
    wrapper = createWrapper({}, shallow);
    wrapper.find(Answer).simulate("addOption", 1);
    expect(mockHandlers.onAddOption).toHaveBeenCalledWith(1);
  });

  it("should focus on a designated field when a transition is complete", () => {
    const input = { focus: jest.fn() };
    const node = {
      querySelectorAll: jest.fn(() => [input])
    };

    wrapper = createWrapper({}, shallow);
    wrapper.find(Answer).simulate("entered", node);
    expect(input.focus).toHaveBeenCalled();
  });
});
