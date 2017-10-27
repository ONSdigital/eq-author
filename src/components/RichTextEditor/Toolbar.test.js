import React from "react";
import Toolbar, {
  ToolbarPanel,
  Button
} from "components/RichTextEditor/Toolbar";
import PipingMenu from "./PipingMenu";
import { shallow, mount } from "enzyme";

let wrapper, props, buttons;

const shape = expect.objectContaining({
  id: expect.any(String),
  title: expect.any(String),
  icon: expect.any(String),
  type: expect.any(String),
  style: expect.any(String)
});

describe("components/RichTextEditor/Toolbar", () => {
  beforeEach(() => {
    props = {
      onToggle: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onPiping: jest.fn(),
      isActiveControl: jest.fn(),
      selectionIsCollapsed: true
    };
    wrapper = shallow(<Toolbar {...props} visible />);
    buttons = wrapper.find(Button);
  });

  it("should render as hidden by default", () => {
    wrapper = shallow(<Toolbar {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(Button).length).toBe(0);
  });

  it("should render as visible", () => {
    expect(buttons.length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
  });

  it("should maintain visibility following a focus event", () => {
    wrapper.find(ToolbarPanel).simulate("focus");
    expect(props.onFocus).toHaveBeenCalled();
  });

  it("should handle blur", () => {
    wrapper.find(ToolbarPanel).simulate("blur");
    expect(props.onBlur).toHaveBeenCalled();
  });

  it("should render Buttons as disabled according to props provided", () => {
    const controls = {
      bold: false,
      emphasis: false,
      list: false,
      heading: false
    };
    wrapper = shallow(<Toolbar {...props} controls={controls} visible />);
    wrapper.find(Button).forEach(node => {
      expect(node.props().disabled).toBe(true);
    });
  });

  describe("PipingMenu", () => {
    it("should disable PipingMenu if selection is not collapsed", () => {
      wrapper = shallow(
        <Toolbar
          {...props}
          visible
          controls={{ piping: true }}
          selectionIsCollapsed={false}
        />
      );
      expect(wrapper.find(PipingMenu).prop("disabled")).toBe(true);
    });

    it("should enable PipingMenu if selection is collapsed", () => {
      wrapper = shallow(
        <Toolbar
          {...props}
          visible
          controls={{ piping: true }}
          selectionIsCollapsed
        />
      );

      expect(wrapper.find(PipingMenu).prop("disabled")).toBe(false);
    });
  });

  it("should call onToggle when clicked with appropriate button object", () => {
    let preventDefault;

    buttons.forEach((node, i) => {
      preventDefault = jest.fn();
      node.simulate("MouseDown", { preventDefault, button: 0 });
      expect(preventDefault).toHaveBeenCalled();
      expect(props.onToggle).toHaveBeenLastCalledWith(shape);
    });
  });

  it("should call onToggle when 'Enter' key is pressed when focused on a button", () => {
    buttons.forEach((node, i) => {
      node.simulate("KeyDown", { key: "Enter" });
      expect(props.onToggle).toHaveBeenLastCalledWith(shape);
    });
  });

  it("should call onToggle when 'space' key is pressed when focused on a button", () => {
    buttons.forEach((node, i) => {
      node.simulate("KeyDown", { key: "Space" });
      expect(props.onToggle).toHaveBeenLastCalledWith(shape);
    });
  });

  it("should not call onToggle when, for example, 'ESC' key is pressed when focused on a button", () => {
    buttons.forEach((node, i) => {
      node.simulate("KeyDown", { key: "ESC" });
      expect(props.onToggle).not.toHaveBeenLastCalledWith(shape);
    });
  });

  describe("Button", () => {
    it("matches snapshot", () => {
      const wrapper = mount(<Button icon="foo.svg" title="foo" />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should style appropriately when active", () => {
      const wrapper = mount(<Button active icon="foo.svg" title="foo" />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
