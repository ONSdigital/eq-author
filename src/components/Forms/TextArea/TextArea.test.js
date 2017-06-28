import React from "react";
import { mount } from "enzyme";
import { TextArea } from "components/Forms/TextArea";
let wrapper;
const defaultValue = "I am some text";
const changeHandler = jest.fn();

describe("components/Forms/TextArea", () => {
  beforeEach(() => {
    wrapper = mount(
      <TextArea
        id="text"
        defaultValue={defaultValue}
        onChange={changeHandler}
      />
    );
  });

  it("should render correctly", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass `defaultValue` prop to component when type=text", () => {
    expect(wrapper.props().defaultValue).toEqual(defaultValue);
  });

  it("should call onChange with appropriate args", () => {
    wrapper.simulate("change", { target: { value: "hello" } });
    expect(changeHandler).toHaveBeenCalledWith({ text: "hello" });
  });
});
