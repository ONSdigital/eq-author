import React from "react";
import { shallow } from "enzyme";
import DateRange from "./index";

const answer = {
  id: "1",
  label: "Lorem ipsum",
  secondaryLabel: "dolor sit amet"
};

describe("DateRange", () => {
  let handleChange;
  let handleUpdate;
  let store;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn()
    };
  });

  it("should render", () => {
    const wrapper = shallow(
      <DateRange
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
        store={store}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
