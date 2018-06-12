import React from "react";
import { shallow, mount } from "enzyme";
import { ToggleChip, ToggleChipGroup } from "components/ToggleChip";

const createWrapper = (props, render = shallow) => {
  return render(<ToggleChip {...props}>Test</ToggleChip>);
};

describe("ToggleChip", () => {
  let wrapper;
  let props;
  let handleChange;

  beforeEach(() => {
    handleChange = jest.fn();

    props = {
      id: "test",
      label: "Test chip",
      title: "Test chip",
      name: "test",
      onChange: handleChange,
      checked: false,
      value: "foo"
    };

    wrapper = createWrapper(props);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render checked", () => {
    let wrapper = createWrapper({
      ...props,
      id: "chiptoggle-1",
      checked: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onChange when clicked", () => {
    const wrapper = createWrapper(props, mount);

    wrapper.find("input").simulate("change");

    expect(handleChange).toHaveBeenCalled();
  });
});

describe("ToggleChipGroup", () => {
  const createWrapper = (props = {}) =>
    mount(
      <ToggleChipGroup name="test" {...props}>
        <ToggleChip title="1" value="1">
          1
        </ToggleChip>
        <ToggleChip title="2" value="2">
          2
        </ToggleChip>
        <ToggleChip title="3" value="3">
          3
        </ToggleChip>
      </ToggleChipGroup>
    );

  it("should mark the matching ToggleChip as checked", () => {
    const wrapper = createWrapper({ value: "2" });
    expect(wrapper.find("input[value='2']").prop("checked")).toBe(true);
  });

  it("doesn't mark any as checked if value not set", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(`input[checked=true]`)).toHaveLength(0);
  });

  it("should allow selection of a new chip", () => {
    const handleChange = jest.fn();
    const wrapper = createWrapper({ value: "2", onChange: handleChange });

    wrapper.find(`input[value="1"]`).simulate("change");

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: "1"
      })
    );
  });

  it("should allow deselection of current chip", () => {
    const handleChange = jest.fn();
    const wrapper = createWrapper({ value: "2", onChange: handleChange });

    wrapper.find(`input[value="2"]`).simulate("change");

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        value: null
      })
    );
  });
});
