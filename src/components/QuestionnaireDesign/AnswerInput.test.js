import React from "react";
import { shallow } from "enzyme";
import AnswerInput from "./AnswerInput";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

const handleChange = jest.fn();

describe("AnswerInput", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <AnswerInput onChange={handleChange} answer={answer}>
        Child
      </AnswerInput>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
