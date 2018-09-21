import React from "react";
import { shallow } from "enzyme";
import { Number } from "components/Forms";

import DateValidation from "./DateValidation";

describe("Date Validation", () => {
  let props;
  beforeEach(() => {
    props = {
      answer: {
        properties: {
          format: "dd/mm/yyyy"
        }
      },
      date: {
        id: "123",
        enabled: true,
        customDate: "2018-01-01",
        offset: {
          value: 5,
          unit: "Months"
        },
        relativePosition: "Before"
      },
      onToggleValidationRule: jest.fn(),
      onChange: jest.fn(),
      onUpdate: jest.fn(),
      testId: "example-test-id",
      displayName: "Some date"
    };
  });

  it("should render disabled message when not enabled", () => {
    props.date.enabled = false;
    const wrapper = shallow(<DateValidation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the form input with the values when enabled", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onToggleValidationRule when enabled/disabled", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    wrapper.find("ValidationView").simulate("toggleChange", { value: true });
    expect(props.onToggleValidationRule).toHaveBeenCalledWith({
      id: "123",
      enabled: true
    });
  });

  it("should trigger update answer validation when the offset value changes", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    const updateValueField = wrapper.find(Number);
    updateValueField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    updateValueField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the offset unit changes", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    const updateUnitField = wrapper.find('[data-test="offset-unit-select"]');
    updateUnitField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    updateUnitField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the relative position changes", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    const relativePositionField = wrapper.find(
      '[data-test="relative-position-select"]'
    );
    relativePositionField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    relativePositionField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the custom value changes", () => {
    const wrapper = shallow(<DateValidation {...props} />);
    const customDateField = wrapper.find('[type="date"]');
    customDateField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    customDateField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should filter the available units for the format", () => {
    const answer = {
      properties: {
        format: "mm/yyyy"
      }
    };
    const wrapper = shallow(<DateValidation {...props} answer={answer} />);
    const updateUnitField = wrapper.find('[data-test="offset-unit-select"]');
    expect(updateUnitField).toMatchSnapshot();
  });

  it("should render a please select for offset unit when the offset unit is not available for the format", () => {
    const answer = {
      properties: {
        format: "yyyy"
      }
    };
    const wrapper = shallow(<DateValidation {...props} answer={answer} />);
    const updateUnitField = wrapper.find('[data-test="offset-unit-select"]');
    expect(updateUnitField).toMatchSnapshot();
  });
});
