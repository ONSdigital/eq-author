import React from "react";
import { shallow } from "enzyme";
import NumberAnswer from "components/Answers/NumberAnswer";

const answer = {
  label: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("NumberAnswer", () => {
  let handleChange;
  let handleUpdate;
  let component;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();

    component = shallow(
      <NumberAnswer
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
