import React from "react";
import { Input } from "components/Forms";
import { HiddenInput } from "components/ToggleSwitch";
import { NUMBER } from "constants/answer-types";

import AnswerProperties from "components/AnswerProperties";
import { shallow, mount } from "enzyme";

let wrapper;
let handleUpdate;
let handleSubmit;
let handleChange;

let answerProperties;

const answer = {
  id: "1",
  index: "0",
  title: "answer-title",
  description: "answer-description",
  type: NUMBER,
  properties: {
    required: true,
    decimals: 2
  }
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

    it("should handle change event for 'Required' toggle input", () => {
      wrapper
        .find(HiddenInput)
        .simulate("change", { target: { value: false } });
      expect(handleChange).toHaveBeenCalledWith({
        id: "1",
        properties: {
          decimals: 2,
          required: false
        }
      });
    });

    it("should handle change event for 'Decimals' number input", () => {
      wrapper
        .find(Input)
        .at(1)
        .simulate("change", { target: { value: 3 } });
      expect(handleChange).toHaveBeenCalledWith({
        id: "1",
        properties: {
          required: true,
          decimals: 3
        }
      });
    });
  });
});
