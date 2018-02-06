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
});
