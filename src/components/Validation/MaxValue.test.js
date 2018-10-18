import React from "react";
import { shallow } from "enzyme";

import { MaxValue } from "components/Validation/MaxValue";
import { ValidationPills } from "components/Validation/ValidationPills";

import { PREVIOUS_ANSWER } from "constants/validation-entity-types";

const createWrapper = (props, render = shallow) =>
  render(<MaxValue {...props} />);

describe("MaxValue", () => {
  let onUpdateAnswerValidation;
  let onToggleValidationRule;
  let props;

  beforeEach(() => {
    onUpdateAnswerValidation = jest.fn();
    onToggleValidationRule = jest.fn();

    props = {
      maxValue: {
        id: "1",
        enabled: true,
        custom: 123,
        inclusive: true,
        entityType: "Custom",
        previousAnswer: null
      },
      onUpdateAnswerValidation: onUpdateAnswerValidation,
      onToggleValidationRule: onToggleValidationRule,
      limit: 999999999,
      answerType: "Number"
    };
  });

  it("should render with content", () => {
    expect(createWrapper(props)).toMatchSnapshot();
  });

  it("should render with disabled content", () => {
    props.maxValue.enabled = false;
    expect(createWrapper(props)).toMatchSnapshot();
  });

  it("should correctly handle toggle change", () => {
    const wrapper = createWrapper(props);
    wrapper.simulate("toggleChange", { value: false });

    expect(onToggleValidationRule).toHaveBeenCalledWith({
      id: props.maxValue.id,
      enabled: false
    });
  });

  it("should correctly handle max value changes with in range values", () => {
    const wrapper = createWrapper(props);

    wrapper.find(ValidationPills).simulate("customValueChange", { value: 1 });

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        custom: 1
      }
    });
  });

  it("should correctly handle max value change with empty string", () => {
    const wrapper = createWrapper(props);

    wrapper.find(ValidationPills).simulate("customValueChange", { value: "" });

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        custom: null
      }
    });
  });

  it("should correctly coerce string inputs to integers", () => {
    const wrapper = createWrapper(props);

    wrapper.find(ValidationPills).simulate("customValueChange", { value: "1" });

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        custom: 1
      }
    });
  });

  it("should correctly handle max value change with out of range values", () => {
    const wrapper = createWrapper(props);

    const maxValueInput = wrapper.find(ValidationPills);
    maxValueInput.simulate("customValueChange", { value: 1000000000 });
    expect(onUpdateAnswerValidation).not.toHaveBeenCalled();

    maxValueInput.simulate("customValueChange", { value: -1000000000 });
    expect(onUpdateAnswerValidation).not.toHaveBeenCalled();

    maxValueInput.simulate("customValueChange", { value: 999999999 });
    expect(onUpdateAnswerValidation).toHaveBeenCalled();

    maxValueInput.simulate("customValueChange", { value: -999999999 });
    expect(onUpdateAnswerValidation).toHaveBeenCalled();
  });

  it("should correctly handle include change", () => {
    const wrapper = createWrapper(props);
    wrapper.find("#max-value-include").simulate("change", { value: false });

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        custom: props.maxValue.custom,
        inclusive: false
      }
    });
  });

  it("should correctly handle entity type change", () => {
    const wrapper = createWrapper(props);

    wrapper.find(ValidationPills).simulate("entityTypeChange", PREVIOUS_ANSWER);

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        entityType: PREVIOUS_ANSWER,
        previousAnswer: null,
        custom: null
      }
    });
  });

  it("should correctly handle previous answer", () => {
    const wrapper = createWrapper(props);

    const previousAnswer = {
      id: 1
    };

    wrapper
      .find(ValidationPills)
      .simulate("previousAnswerChange", previousAnswer);

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        previousAnswer: previousAnswer.id
      }
    });
  });
});
