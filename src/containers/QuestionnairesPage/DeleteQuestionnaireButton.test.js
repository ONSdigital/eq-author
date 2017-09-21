import React from "react";
import { shallow } from "enzyme";
import DeleteQuestionnaireButton, {
  StyledButton
} from "./DeleteQuestionnaireButton";

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
    const deleteButton = wrapper.find(StyledButton);
    deleteButton.simulate("click");

    expect(handleClick).toHaveBeenCalled();
  });
});
