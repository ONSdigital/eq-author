import React from "react";
import { shallow } from "enzyme";

import { ValidationPills } from "components/Validation/ValidationPills";

import { PREVIOUS_ANSWER } from "constants/validation-entity-types";
import { NUMBER } from "constants/answer-types";

const createWrapper = (props, render = shallow) =>
  render(<ValidationPills {...props} />);

describe("ValidationPills", () => {
  let props;

  beforeEach(() => {
    props = {
      entityType: PREVIOUS_ANSWER,
      answerType: NUMBER,
      previousAnswer: {
        displayName: "foobar"
      },
      customValue: 1,
      customValueLimit: 99999,
      onEntityTypeChange: jest.fn(),
      onPreviousAnswerChange: jest.fn(),
      onCustomValueChange: jest.fn()
    };
  });

  it("should render", () => {
    expect(createWrapper(props)).toMatchSnapshot();
  });
});
