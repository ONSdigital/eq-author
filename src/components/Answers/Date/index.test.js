import React from "react";
import { shallow } from "enzyme";
import Date from "components/Answers/Date";

const answer = {
  id: "1",
  label: "Lorem ipsum"
};

describe("Date", () => {
  let handleChange;
  let handleUpdate;
  let wrapper;
  let store;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn()
    };

    wrapper = shallow(
      <Date
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
        store={store}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
