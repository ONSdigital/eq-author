import React from "react";
import { shallow } from "enzyme";

import { MaxValue } from "components/Validation/MaxValue";

import { byTestAttr } from "tests/utils/selectors";

const createWrapper = (props, render = shallow) => {
  return render(<MaxValue {...props} />);
};

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
        custom: true,
        inclusive: true
      },
      onUpdateAnswerValidation: onUpdateAnswerValidation,
      onToggleValidationRule: onToggleValidationRule,
      limit: 999999999
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
    wrapper
      .find(byTestAttr("max-value-input"))
      .simulate("change", { value: 1 });

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
    wrapper
      .find(byTestAttr("max-value-input"))
      .simulate("change", { value: "" });

    expect(onUpdateAnswerValidation).toHaveBeenCalledWith({
      id: props.maxValue.id,
      maxValueInput: {
        inclusive: props.maxValue.inclusive,
        custom: null
      }
    });
  });

  it("should correctly handle max value change with out of range values", () => {
    const wrapper = createWrapper(props);

    const maxValueInput = wrapper.find(byTestAttr("max-value-input"));
    maxValueInput.simulate("change", { value: 1000000000 });
    expect(onUpdateAnswerValidation).not.toHaveBeenCalled();

    maxValueInput.simulate("change", { value: -1000000000 });
    expect(onUpdateAnswerValidation).not.toHaveBeenCalled();

    maxValueInput.simulate("change", { value: 999999999 });
    expect(onUpdateAnswerValidation).toHaveBeenCalled();

    maxValueInput.simulate("change", { value: -999999999 });
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
});
