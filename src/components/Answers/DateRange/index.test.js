import React from "react";
import { shallow } from "enzyme";
import DateRange from "./index";
import createMockStore from "tests/utils/createMockStore";

const answer = {
  id: "1",
  label: "Lorem ipsum",
  childAnswers: [
    {
      id: "1from",
      label: "Foo",
      type: "DateRange"
    },
    {
      id: "1to",
      label: "Bar",
      type: "DateRange"
    }
  ]
};

describe("DateRange", () => {
  let handleChange;
  let handleUpdate;
  let store;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    store = createMockStore();
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
