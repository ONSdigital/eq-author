import React from "react";
import Toolbar, {
  ToolbarPanel,
  Button
} from "components/RichTextEditor/Toolbar";

import { shallow } from "enzyme";

let wrapper;
let props;

describe("components/RichTextEditor/Toolbar", function() {
  beforeEach(() => {
    props = {
      onToggle: jest.fn(),
      isActiveControl: jest.fn()
    };
    wrapper = shallow(<Toolbar {...props} />);
  });

  it("should render as hidden", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as visible", () => {
    wrapper.setProps({ visible: true });
    expect(wrapper.state("visible")).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });

  it("should be visible following a focus event", () => {
    wrapper.find(ToolbarPanel).simulate("focus");
    expect(wrapper.state("visible")).toBe(true);
  });

  it("should render Buttons as disabled according to props provided", () => {
    const buttonProps = {
      bold: false,
      emphasis: false,
      list: false,
      heading: false
    };
    wrapper = shallow(<Toolbar {...props} {...buttonProps} />);
    wrapper.find(Button).forEach(node => {
      expect(node.props().disabled).toBe(true);
    });
  });

  it("should call onToggle when clicked with appropriate button object", () => {
    const preventDefault = jest.fn();
    wrapper.find(Button).forEach((node, i) => {
      node.simulate("MouseDown", { preventDefault });
      expect(preventDefault).toHaveBeenCalledTimes(i + 1);
      expect(props.onToggle).toHaveBeenCalledTimes(i + 1);
      expect(props.onToggle).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.any(String),
          icon: expect.any(String),
          type: expect.any(String),
          style: expect.any(String)
        })
      );
    });
  });
});
