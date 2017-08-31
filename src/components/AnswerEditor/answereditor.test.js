import React from "react";
import { mount } from "enzyme";
import AnswerEditor from "./index";

describe("Answer Editor", () => {
  it("should render TextField", () => {
    expect(
      mount(
        <AnswerEditor
          answer={{
            id: 1,
            title: "",
            description: "",
            type: "TextField"
          }}
          answerIndex={0}
          onChange={jest.fn()}
          onDeleteAnswer={jest.fn()}
          onAddOption={jest.fn()}
          onDeleteOption={jest.fn()}
          onBlur={jest.fn()}
          onEntered={jest.fn()}
          onFocus={jest.fn()}
        />
      )
    ).toMatchSnapshot("Textfield");
  });

  it("should render Checkbox", () => {
    expect(
      mount(
        <AnswerEditor
          answer={{
            id: 1,
            title: "",
            description: "",
            type: "Checkbox",
            options: [
              {
                id: 1,
                label: "",
                description: ""
              }
            ]
          }}
          answerIndex={0}
          onChange={jest.fn()}
          onDeleteAnswer={jest.fn()}
          onAddOption={jest.fn()}
          onDeleteOption={jest.fn()}
          onBlur={jest.fn()}
          onEntered={jest.fn()}
          onFocus={jest.fn()}
        />
      )
    ).toMatchSnapshot("Checkbox");
  });
});
