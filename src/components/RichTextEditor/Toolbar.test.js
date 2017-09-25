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
      onFocus: jest.fn(),
      isActiveControl: jest.fn()
    };
    wrapper = shallow(<Toolbar {...props} />);
  });

  it("should render as hidden", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as visible", () => {
    wrapper.setProps({ visible: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should maintain visibility following a focus event", () => {
    wrapper
      .setProps({ visible: true })
      .find(ToolbarPanel)
      .simulate("focus");

    expect(props.onFocus).toHaveBeenCalled();
  });

  it("should render Buttons as disabled according to props provided", () => {
    const controls = {
      bold: false,
      emphasis: false,
      list: false,
      heading: false
    };
    wrapper = shallow(<Toolbar {...props} controls={controls} />);
    wrapper.find(Button).forEach(node => {
      expect(node.props().disabled).toBe(true);
    });
  });

  it("should call onToggle when clicked with appropriate button object", () => {
    let preventDefault;
    wrapper.find(Button).forEach((node, i) => {
      preventDefault = jest.fn();
      node.simulate("MouseDown", { preventDefault });
      expect(preventDefault).toHaveBeenCalled();
      expect(props.onToggle.mock.calls[i][0]).toBe(
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
