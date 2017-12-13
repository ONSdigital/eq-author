import React from "react";
import { shallow } from "enzyme";
import DeleteQuestionnaireButton from "./DeleteQuestionnaireButton";

describe("DeleteQuestionnaireButton", () => {
  let wrapper;
  let handleClick;

  beforeEach(() => {
    handleClick = jest.fn();
    wrapper = shallow(<DeleteQuestionnaireButton onClick={handleClick} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke onClick prop when delete button clicked", () => {
    wrapper.simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });
});
