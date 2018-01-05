import React from "react";
import mountWithRouter from "tests/utils/mountWithRouter";
import { NavWithoutRouter } from "components/Nav";

let wrapper;

const questionnaire = {
  id: "1",
  title: "Questionnaire",
  sections: [
    {
      id: "2",
      title: "Section 1",
      pages: [
        {
          id: "3"
        }
      ]
    }
  ]
};

const match = { params: {}, path: "", url: "" };

describe("components/Nav", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <NavWithoutRouter
        questionnaire={questionnaire}
        section={questionnaire.sections[0]}
        page={questionnaire.sections[0].pages[0]}
        match={match}
      />
    );
  });

  it("should render Nav", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain links", () => {
    expect(wrapper.find("a")).toBeTruthy();
  });

  it("should display active link when route matches", () => {
    wrapper.setProps({ match: { ...match, params: { sectionId: "888" } } });
    expect(wrapper).toMatchSnapshot();
  });
});
