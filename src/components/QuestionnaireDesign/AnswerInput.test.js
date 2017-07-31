import React from "react";
import AnswerInput from "./AnswerInput";
import { shallow } from "enzyme";

let wrapper;

describe("AnswerInput", function() {
  beforeEach(() => {
    wrapper = shallow(<AnswerInput>Child</AnswerInput>);
  });
  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
