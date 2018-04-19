import React from "react";
import { shallow } from "enzyme";
import QuestionnaireLink from "./QuestionnaireLink";

const questionnaire = {
  id: "1",
  title: "Foo",
  createdAt: "2017/01/02",
  sections: [
    {
      id: "1",
      pages: [{ id: "1" }]
    }
  ],
  createdBy: {
    name: "Alan"
  }
};

describe("QuestionnaireLink", () => {
  it("should render", () => {
    const wrapper = shallow(
      <QuestionnaireLink questionnaire={questionnaire} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should link to section if cannot link to page", () => {
    const wrapper = shallow(
      <QuestionnaireLink
        questionnaire={{
          id: "1",
          title: "Foo",
          sections: [
            {
              id: "1",
              pages: []
            }
          ]
        }}
      />
    );

    expect(wrapper.prop("to")).toMatchSnapshot();
  });
});
