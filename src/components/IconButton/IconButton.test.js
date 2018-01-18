import React from "react";
import { shallow } from "enzyme";
import IconButton from "components/IconButton";

const createWrapper = (props, render = shallow) => {
  return render(<IconButton {...props} />);
};

describe("IconButton", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn(),
      children: <div>Icon button children</div>
    };

    wrapper = createWrapper(props);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
