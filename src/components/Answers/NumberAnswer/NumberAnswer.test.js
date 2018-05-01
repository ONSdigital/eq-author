import React from "react";
import { shallow } from "enzyme";
import NumberAnswer from "components/Answers/NumberAnswer";
import createMockStore from "tests/utils/createMockStore";

const answer = {
  label: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("NumberAnswer", () => {
  let handleChange;
  let handleUpdate;
  let component;
  let store;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    store = createMockStore();

    component = shallow(
      <NumberAnswer
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
        store={store}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
