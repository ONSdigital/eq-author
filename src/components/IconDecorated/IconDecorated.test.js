import React from "react";
import { shallow } from "enzyme";
import IconDecorated from "components/IconDecorated";
import icon from "components/IconDecorated/IconLink/icon-test.svg";
import { Button } from "components/IconDecorated/IconButton";

describe("IconDecorated", () => {
  let wrapper;
  let handleClick;
  beforeEach(() => {
    handleClick = jest.fn();

    wrapper = shallow(
      <IconDecorated
        icon={icon}
        title="Title"
        type="button"
        component={Button}
        handleClick={handleClick}
      />
    );
  });

  it("should render a button", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("will handleClick", function() {
    wrapper.find(Button).simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
