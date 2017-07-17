import React from "react";
import { shallow } from "enzyme";
import QuestionnaireDesign from "./";

describe("QuestionnaireDesign", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <QuestionnaireDesign
        section={{ title: "My section" }}
        page={{ title: "My page" }}
        onChange={jest.fn()}
        onAnswerAdd={jest.fn()}
        onFocus={jest.fn()}
        onBlur={jest.fn()}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
