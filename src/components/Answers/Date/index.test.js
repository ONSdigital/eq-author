import React from "react";
import { shallow } from "enzyme";
import Date from "components/Answers/Date";
import createMockStore from "tests/utils/createMockStore";

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
    store = createMockStore();
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
