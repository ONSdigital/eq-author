import React from "react";
import { mount } from "enzyme";

import QuestionnaireMeta from "components/QuestionnaireMeta";

let wrapper;

const handleChange = jest.fn();
const handleSubmit = jest.fn();
const handleBlur = jest.fn();
const questionnaire = {
  description: "I am the description",
  legalBasis: "StatisticsOfTradeAct",
  theme: "default",
  title: "I am the title"
};

describe("QuestionnaireMeta", () => {
  beforeEach(() => {
    wrapper = mount(
      <QuestionnaireMeta
        questionnaire={questionnaire}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleBlur={handleBlur}
      >
        Children
      </QuestionnaireMeta>
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle submit event", () => {
    wrapper.find("form").simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should handle change event on child inputs", () => {
    const inputs = wrapper.find("[onChange]");
    inputs.forEach(input => {
      input.simulate("change");
    });

    expect(inputs.length).toBeGreaterThan(0);
    expect(handleChange).toHaveBeenCalledTimes(inputs.length);
  });

  it("should handle blur event on child inputs", () => {
    const inputs = wrapper.find("[onBlur]");
    inputs.forEach(input => {
      input.simulate("blur");
    });

    expect(inputs.length).toBeGreaterThan(0);
    expect(handleBlur).toHaveBeenCalledTimes(inputs.length);
  });
});
