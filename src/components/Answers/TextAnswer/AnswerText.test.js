import React from "react";
import { shallow } from "enzyme";
import AnswerText from "./AnswerText";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

const handleChange = jest.fn();

describe("AnswerText", () => {
  let component;

  beforeEach(() => {
    component = shallow(<AnswerText onChange={handleChange} answer={answer} />);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
