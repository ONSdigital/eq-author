import React from "react";
import { shallow } from "enzyme";
import DateRange from "./index";

const answer = {
  label: "Lorem ipsum",
  secondaryLabel: "dolor sit amet"
};

describe("DateRange", () => {
  let handleChange;
  let handleUpdate;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
  });

  it("should render", () => {
    const wrapper = shallow(
      <DateRange
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
