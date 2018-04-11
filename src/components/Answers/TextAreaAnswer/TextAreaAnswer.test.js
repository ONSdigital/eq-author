import React from "react";
import { shallow } from "enzyme";
import TextAreaAnswer from "components/Answers/TextAreaAnswer";

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
    store = {
      subscribe: jest.fn(),
      dispatch: jest.fn(),
      getState: jest.fn()
    };

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
