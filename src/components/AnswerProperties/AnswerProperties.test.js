import React from "react";
import Input from "components/Forms/Input";

import { TEXTFIELD } from "constants/answer-types";

import AnswerProperties from "components/AnswerProperties";
import { shallow, mount } from "enzyme";

let wrapper;

let handleUpdate;
let handleSubmit;
let handleChange;

let answerProperties;

const answer = {
  id: "1",
  title: "answer-title",
  description: "answer-description",
  type: TEXTFIELD,
  mandatory: false
};

describe("Answer Properties", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    handleChange = jest.fn();

    answerProperties = () => (
      <AnswerProperties
        answer={answer}
        onUpdate={handleUpdate}
        loading={false}
        onSubmit={handleSubmit}
        onUpdateAnswer={handleChange}
      />
    );

    wrapper = shallow(answerProperties());
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("behaviour", () => {
    beforeEach(() => {
      wrapper = mount(answerProperties());
    });

    it("should handle change event for mandatory checkbox", () => {
      wrapper
        .find(Input)
        .simulate("change", { target: { type: "checkbox", checked: true } });
      expect(handleChange).toHaveBeenCalledWith({
        id: "1",
        mandatory: true
      });
    });
  });
});
