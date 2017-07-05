import React from "react";
import QuestionnaireDesign from "./QuestionnaireDesign";
import { shallow } from "enzyme";

describe("containers/QuestionnaireDesign", () => {
  it("should render spinner when loading", () => {
    const wrapper = shallow(<QuestionnaireDesign loading />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render form when loaded", () => {
    const wrapper = shallow(
      <QuestionnaireDesign
        loading={false}
        questionnaire={{ title: "hello world" }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
