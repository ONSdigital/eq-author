import React from "react";
import { shallow, mount } from "enzyme";
import { StatelessBasicAnswer } from "components/Answers/BasicAnswer";
import WrappingInput from "components/WrappingInput";

describe("BasicAnswer", () => {
  let answer;
  let onChange;
  let onUpdate;
  let children;
  let props;

  const createWrapper = (props, children, render = shallow) => {
    return render(
      <StatelessBasicAnswer {...props}>{children}</StatelessBasicAnswer>
    );
  };

  beforeEach(() => {
    answer = {
      title: "Answer title",
      description: "Answer description",
      label: "",
      type: "TextField"
    };
    onChange = jest.fn();
    onUpdate = jest.fn();

    props = {
      answer,
      onChange,
      onUpdate
    };

    children = <div>This is the child component</div>;
  });

  it("should render", () => {
    expect(createWrapper(props, children)).toMatchSnapshot();
  });

  describe("event handling behaviour", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createWrapper(props, children, mount);
    });

    it("should invoke update callback onBlur", () => {
      wrapper.find(WrappingInput).forEach(input => input.simulate("blur"));

      expect(onUpdate).toHaveBeenCalledTimes(2);
    });

    it("should invoke change callback onChange", () => {
      wrapper.find(WrappingInput).forEach(input => input.simulate("change"));

      expect(onChange).toHaveBeenCalledTimes(2);
    });
  });
});
