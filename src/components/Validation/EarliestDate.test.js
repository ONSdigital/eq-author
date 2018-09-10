import React from "react";
import { shallow } from "enzyme";

import {
  EarliestDate,
  readToWriteMapper,
  remapToOnUpdate
} from "./EarliestDate";

describe("Earliest date", () => {
  let props;
  beforeEach(() => {
    props = {
      earliestDate: {
        id: 123,
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
      onUpdate: jest.fn()
    };
  });

  it("should render disabled message when not enabled", () => {
    props.earliestDate.enabled = false;
    const wrapper = shallow(<EarliestDate {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the form input with the values when enabled", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onToggleValidationRule when enabled/disabled", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    wrapper.find("ValidationView").simulate("toggleChange", { value: true });
    expect(props.onToggleValidationRule).toHaveBeenCalledWith({
      id: 123,
      enabled: true
    });
  });

  it("should trigger update answer validation when the offset value changes", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    const updateValueField = wrapper.find("Number");
    updateValueField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    updateValueField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the offset unit changes", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    const updateUnitField = wrapper.find('[data-test="offset-unit-select"]');
    updateUnitField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    updateUnitField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the relative position changes", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    const relativePositionField = wrapper.find(
      '[data-test="relative-position-select"]'
    );
    relativePositionField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    relativePositionField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  it("should trigger update answer validation when the custom value changes", () => {
    const wrapper = shallow(<EarliestDate {...props} />);
    const customDateField = wrapper.find('[type="date"]');
    customDateField.simulate("change", "event");
    expect(props.onChange).toHaveBeenCalledWith("event");
    customDateField.simulate("blur", "event");
    expect(props.onUpdate).toHaveBeenCalledWith("event");
  });

  describe("readToWriteMapper", () => {
    it("should map the read version of earliest date to the expected write input", () => {
      expect(
        readToWriteMapper({
          id: 1,
          customDate: "12/05/1987",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        })
      ).toMatchObject({
        id: 1,
        earliestDateInput: {
          custom: "12/05/1987",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        }
      });
    });

    it("should send null when the custom date is empty", () => {
      expect(
        readToWriteMapper({
          id: 1,
          customDate: "",
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        })
      ).toMatchObject({
        id: 1,
        earliestDateInput: {
          custom: null,
          offset: {
            unit: "Months",
            value: 1
          },
          relativePosition: "Before"
        }
      });
    });
  });

  describe("remapToOnUpdate", () => {
    it("should remap a function prop to onUpdate", () => {
      const Component = "div";
      const EnhancedComponent = remapToOnUpdate(
        "onSomething",
        thing => `prefix-${thing}`
      )(Component);
      const onSomething = jest.fn();
      const wrapper = shallow(<EnhancedComponent onSomething={onSomething} />);
      wrapper.props().onUpdate("hello");
      expect(onSomething).toHaveBeenCalledWith("prefix-hello");
    });
  });
});
