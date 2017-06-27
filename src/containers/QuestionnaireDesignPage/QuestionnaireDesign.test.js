import React from "react";
import QuestionnaireDesign from "./QuestionnaireDesign";
import { mount } from "enzyme";

let wrapper;

describe("containers/QuestionnaireDesign", () => {
  beforeEach(() => {
    wrapper = mount(<QuestionnaireDesign loading />);
  });
  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
