import React from "react";
import { shallow } from "enzyme";
import TextAreaAnswer from "components/Answers/TextAreaAnswer";
import createMockStore from "tests/utils/createMockStore";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("TextAreaAnswer", () => {
  let handleChange;
  let handleUpdate;
  let component;
  let store;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    store = createMockStore();
    component = shallow(
      <TextAreaAnswer
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
