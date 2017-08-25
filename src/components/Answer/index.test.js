import React from "react";
import Answer from "./index";
import { shallow } from "enzyme";

import { TEXTFIELD, CHECKBOX } from "constants/answer-types";

describe("Answer", () => {
  function render(type) {
    return shallow(
      <Answer
        answer={{ type }}
        onChange={jest.fn()}
        answerIndex={0}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
        onAddOption={jest.fn()}
        onDeleteOption={jest.fn()}
        onEntered={jest.fn()}
        index={0}
      />
    );
  }

  it("should render <TextAnswer /> for answer type 'TextField'", () => {
    expect(render(TEXTFIELD)).toMatchSnapshot();
  });

  it("should render <CheckboxAnswer /> for answer type 'Checkbox'", () => {
    expect(render(CHECKBOX)).toMatchSnapshot();
  });
});
