import React from "react";
import Form from "components/Forms/Form";
import Input from "components/Forms/Input";

import { TEXTFIELD } from "constants/answer-types";

import AnswerProperties from "components/AnswerProperties";
import { shallow, mount } from "enzyme";

let wrapper;

let handleUpdate;
let handleSubmit;
let handleChange;
let handleBlur;

let answerProperties;

const answer = {
  title: "answer-title",
  description: "answer-description",
  type: TEXTFIELD
};

describe("Answer Properties", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    handleChange = jest.fn();
    handleBlur = jest.fn();

    answerProperties = () =>
      <AnswerProperties
        answer={answer}
        onUpdate={handleUpdate}
        loading={false}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
      />;

    wrapper = shallow(answerProperties());
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("behaviour", () => {
    beforeEach(() => {
      wrapper = mount(answerProperties());
    });

    it("should handle submit event", () => {
      wrapper.find(Form).simulate("submit");
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle change event for checkbox", () => {
      wrapper.find(Input).simulate("change");
      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle blur event for checkbox", () => {
      wrapper.find(Input).simulate("blur");
      expect(handleBlur).toHaveBeenCalled();
    });

    it("should handle change event for text area", () => {
      wrapper.find("textarea").simulate("change");
      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle blur event for text area", () => {
      wrapper.find("textarea").simulate("blur");
      expect(handleBlur).toHaveBeenCalled();
    });
  });
});
