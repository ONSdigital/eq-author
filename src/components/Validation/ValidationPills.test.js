import React from "react";
import { shallow } from "enzyme";

import { Pills, ValidationPills } from "components/Validation/ValidationPills";

import { PREVIOUS_ANSWER } from "constants/validation-entity-types";

const createWrapper = (props, render = shallow) =>
  render(<ValidationPills {...props} />);

describe("ValidationPills", () => {
  let props, wrapper;

  beforeEach(() => {
    props = {
      entityType: PREVIOUS_ANSWER,
      onEntityTypeChange: jest.fn(),
      PreviousAnswer: () => <div>Previous Answer Content</div>,
      Custom: () => <div>Previous Answer Content</div>
    };

    wrapper = createWrapper(props);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render previous answer", () => {
    const previousAnswer = wrapper.find(Pills).prop("options")[0];
    expect(shallow(previousAnswer.render())).toMatchSnapshot();
  });

  it("should render custom", () => {
    const custom = wrapper.find(Pills).prop("options")[1];
    expect(shallow(custom.render())).toMatchSnapshot();
  });
});
