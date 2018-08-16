import React from "react";
import { Input, Select } from "components/Forms";
import { HiddenInput } from "components/ToggleSwitch";
import { NUMBER, DATE } from "constants/answer-types";

import AnswerProperties from "components/AnswerProperties";
import { shallow, mount } from "enzyme";

let wrapper;
let handleUpdate;
let handleSubmit;
let handleChange;

let answerProperties;

let answer = {
  id: "1",
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

    answerProperties = (props = {}) => (
      <AnswerProperties
        answer={answer}
        onUpdate={handleUpdate}
        loading={false}
        onSubmit={handleSubmit}
        onUpdateAnswer={handleChange}
        {...props}
      />
    );

    wrapper = shallow(answerProperties());
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe("behaviour", () => {
    it("should handle change event for 'Required' toggle input", () => {
      wrapper = mount(answerProperties());

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
      wrapper = mount(answerProperties());

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

    it("should handle change event for 'Date Format' number input", () => {
      wrapper = mount(
        answerProperties({
          answer: {
            id: "1",
            type: DATE,
            properties: {
              required: true,
              format: "dd/mm/yyyy"
            }
          }
        })
      );

      wrapper.find(Select).simulate("change", { target: { value: "mm/yy" } });
      expect(handleChange).toHaveBeenCalledWith({
        id: "1",
        properties: {
          required: true,
          format: "mm/yy"
        }
      });
    });
  });
});
