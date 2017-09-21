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

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();

    component = shallow(
      <CurrencyAnswer
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
