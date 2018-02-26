import React from "react";
import { shallow } from "enzyme";
import IconButtonDelete from "components/IconButtonDelete";

describe("IconButtonDelete", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      anotherProp: "test"
    };
    wrapper = shallow(
      <IconButtonDelete {...props}>Icon button text</IconButtonDelete>
    );
  });

  it("should pass on props", () => {
    expect(wrapper.props().onClick).toBe(props.onClick);
    expect(wrapper.props().anotherProp).toBe(props.anotherProp);
  });
});
