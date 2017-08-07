import React from "react";
import { mount, shallow } from "enzyme";
import QuestionnaireDesign from "./";
import DeleteButton from "components/DeleteButton";

const option = {
  id: 0
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

describe("QuestionnaireDesign", () => {
  let wrapper;
  const createWrapper = (props, render = mount) =>
    render(
      <QuestionnaireDesign
        onChange={jest.fn()}
        onAddAnswer={jest.fn()}
        onDeleteAnswer={jest.fn()}
        onAddOption={jest.fn()}
        onDeleteOption={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        focused={null}
        {...props}
      />
    );

  beforeEach(() => {
    wrapper = createWrapper({
      section,
      page,
      answers: [answer]
    });
  });

  it("should render", () => {
    wrapper = createWrapper(
      {
        section,
        page,
        answers: [answer]
      },
      shallow
    );

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
    wrapper = createWrapper({
      section,
      page,
      answers: [answer]
    });
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
      page,
      answers: [answer]
    });
    expect(document.activeElement.name).toEqual("page.title");
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
});
