import React from "react";
import { shallow } from "enzyme";
import AddQuestionPageButton from "./AddQuestionPageButton";

describe("Add question page button", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClick: jest.fn()
    };

    wrapper = shallow(<AddQuestionPageButton {...props} />);
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle click event", () => {
    wrapper.find("IconButton").simulate("click");
    expect(props.onClick).toHaveBeenCalled();
  });
});
