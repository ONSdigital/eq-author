import React from "react";
import Form from "components/Forms/Form";
import Input from "components/Forms/Input";

import { TEXTFIELD } from "constants/answer-types";

import AnswerProperties from "components/AnswerProperties";
import { mount } from "enzyme";

let wrapper;

const handleUpdate = jest.fn();
const handleSubmit = jest.fn();
const handleChange = jest.fn();
const handleBlur = jest.fn();

const answer = {
  title: "answer-title",
  description: "answer-description",
  type: TEXTFIELD
};

describe("Answer Properties", () => {
  beforeEach(() => {
    wrapper = mount(
      <AnswerProperties
        answer={answer}
        onUpdate={handleUpdate}
        loading={false}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
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
