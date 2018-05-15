import React from "react";
import mountWithRouter from "tests/utils/mountWithRouter";
import { UnwrappedTabs } from "components/Tabs";

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

const match = {
  params: { questionnaireId: "", sectionId: "", pageId: "" }
};

describe("components/Nav", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <UnwrappedTabs
        questionnaire={questionnaire}
        section={questionnaire.sections[0]}
        page={questionnaire.sections[0].pages[0]}
        match={match}
      >
        Tab Content
      </UnwrappedTabs>
    );
  });

  it("should render Nav", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display active link when route matches", () => {
    const params = { questionnaireId: "", sectionId: "888", pageId: "" };

    wrapper.setProps({
      match: {
        ...match,
        params
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
