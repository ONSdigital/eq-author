import React from "react";
import { shallow } from "enzyme";
import CurrencyAnswer from "components/Answers/CurrencyAnswer";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("CurrencyAnswer", () => {
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
      <CurrencyAnswer
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
