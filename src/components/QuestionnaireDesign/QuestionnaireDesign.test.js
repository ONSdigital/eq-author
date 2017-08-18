import React from "react";
import { mount, shallow } from "enzyme";
import QuestionnaireDesign from "./";

describe("QuestionnaireDesign", () => {
  let wrapper;
  const createWrapper = (props, render = mount) =>
    render(
      <QuestionnaireDesign
        onChange={jest.fn()}
        onAddAnswer={jest.fn()}
        onDeleteAnswer={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        answers={[]}
        focused="answer"
        {...props}
      />
    );

  beforeEach(() => {
    wrapper = createWrapper({
      section: { title: "" },
      page: { id: "3", title: "" }
    });
  });

  it("should render", () => {
    wrapper = createWrapper(
      {
        section: { title: "" },
        page: { id: "3", title: "" },
        answers: [
          {
            id: "4"
          }
        ]
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
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should focus on empty page title when section title is not empty", () => {
    wrapper = createWrapper({
      section: { title: "Section 1" },
      page: { id: "3", title: "" }
    });
    expect(document.activeElement.name).toEqual("page.title");
  });

  it("should move focus to empty section title upon navigation to new page", () => {
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should move focus to empty page title upon navigation to new page", () => {
    wrapper = createWrapper({
      section: { title: "Section 1" },
      page: { id: "3", title: "" }
    });
    expect(document.activeElement.name).toEqual("page.title");
  });
});
