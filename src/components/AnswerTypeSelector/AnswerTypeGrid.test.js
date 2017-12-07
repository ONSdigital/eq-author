import React from "react";
import { shallow } from "enzyme";
import AnswerTypeGrid, { CloseButton } from "./AnswerTypeGrid";
import AnswerTypeButton from "./AnswerTypeButton";

let wrapper, handleClose, handleSelect;

describe("components/AnswerTypeGrid", () => {
  beforeEach(() => {
    handleClose = jest.fn();
    handleSelect = jest.fn();

    wrapper = shallow(
      <AnswerTypeGrid
        onClose={handleClose}
        aria-labelledby="foo"
        onSelect={handleSelect}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("when close button clicked", () => {
    it("should invoke `onClose` callback", () => {
      wrapper.find(CloseButton).simulate("click");
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe("when answer type button clicked", () => {
    it("should invoke `onSelect` callback", () => {
      const answerType = "TextField";
      wrapper
        .find(AnswerTypeButton)
        .first()
        .simulate("click", answerType);

      expect(handleClose).toHaveBeenCalled();
      expect(handleSelect).toHaveBeenCalledWith(answerType);
    });
  });

  it("should focus on the underlying button element when focusMenuItem is called", () => {
    const btn = document.createElement("button");
    wrapper.instance().saveButtonRef(btn);
    wrapper.instance().focusMenuItem();
    expect(document.activeElement).toBe(btn);
  });
});
