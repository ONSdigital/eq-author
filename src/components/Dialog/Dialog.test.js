import React from "react";
import { shallow } from "enzyme";
import Dialog from "components/Dialog";

const createWrapper = (props, render = shallow) => {
  return render(<Dialog {...props} />);
};

describe("components/Dialog", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      children: <div>Dialog content</div>
    };

    wrapper = createWrapper(props);
  });

  it("should render a dialog", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render children", () => {
    const wrapper = createWrapper({
      ...props,
      children: <p>This is the modal dialog content</p>
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle close when close button is clicked", () => {
    wrapper.find("Dialog__CloseButton").simulate("click");
    expect(props.onClose).toHaveBeenCalled();
  });
});
