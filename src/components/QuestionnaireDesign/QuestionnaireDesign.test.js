import React from "react";
import { mount } from "enzyme";
import QuestionnaireDesign from "./";

describe("QuestionnaireDesign", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <QuestionnaireDesign
        section={{ id: "0", title: "" }}
        page={{ id: "1", title: "" }}
        onChange={jest.fn()}
        onAnswerAdd={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should focus on empty section title upon mount", () => {
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should focus on empty page title when section title is not empty", () => {
    wrapper.setProps({ section: { title: "Section 1" } });
    wrapper.unmount();
    wrapper.mount();

    expect(document.activeElement.name).toEqual("page.title");
  });

  it("should move focus to empty section title upon navigation to new page", () => {
    wrapper.setProps({
      section: { id: "2", title: "" },
      page: { id: "3", title: "" }
    });
    expect(document.activeElement.name).toEqual("section.title");
  });

  it("should move focus to empty page title upon navigation to new page", () => {
    wrapper.setProps({
      section: { title: "Section 1" },
      page: { id: "3", title: "" }
    });
    expect(document.activeElement.name).toEqual("page.title");
  });
});
