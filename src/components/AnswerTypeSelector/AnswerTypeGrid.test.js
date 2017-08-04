import React from "react";
import { shallow } from "enzyme";
import AnswerTypeGrid, { CloseButton } from "./AnswerTypeGrid";
import AnswerTypeButton from "./AnswerTypeButton";

let component, handleClose, handleSelect;

describe("components/AnswerTypeGrid", () => {
  beforeEach(() => {
    handleClose = jest.fn();
    handleSelect = jest.fn();

    component = shallow(
      <AnswerTypeGrid
        onClose={handleClose}
        aria-labelledby="foo"
        onSelect={handleSelect}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  describe("when close button clicked", () => {
    it("should invoke `onClose` callback", () => {
      component.find(CloseButton).simulate("click");
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("when answer type button clicked", () => {
    it("should invoke `onSelect` callback", () => {
      const answerType = "textfield";
      component.find(AnswerTypeButton).first().simulate("click", answerType);

      expect(handleClose).toHaveBeenCalled();
      expect(handleSelect).toHaveBeenCalledWith(answerType);
    });
  });
});
