import React from "react";
import { shallow } from "enzyme";
import AnswerTypeButton from "./AnswerTypeButton";
import { IconGridButton } from "components/IconGrid";

let component, handleClick;
const answerType = "textfield";

describe("components/AnswerTypeButton", () => {
  beforeEach(() => {
    handleClick = jest.fn();

    component = shallow(
      <AnswerTypeButton
        type={answerType}
        onClick={handleClick}
        title="Text field"
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("will throw when a non-existent answer type is used", function() {
    expect(() => {
      component.setProps({ type: "not-an-answer-type" });
    }).toThrow();
  });

  describe("when clicked", () => {
    it("should invoke callback with answer type", () => {
      component.find(IconGridButton).simulate("click");
      expect(handleClick).toHaveBeenCalledWith(answerType);
    });
  });
});
