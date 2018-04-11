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

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();

    wrapper = shallow(
      <Date onChange={handleChange} onUpdate={handleUpdate} answer={answer} />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
