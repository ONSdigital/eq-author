import React from "react";
import {
  Menu as PipingMenu,
  MenuButton as PipingMenuButton
} from "./PipingMenu";
import { shallow } from "enzyme";
import { CHECKBOX, RADIO } from "constants/answer-types";

describe("PipingMenu", () => {
  let match, handleItemChosen, questionnaire;

  const render = (props = {}) =>
    shallow(
      <PipingMenu
        match={match}
        onItemChosen={handleItemChosen}
        data={{ questionnaire }}
        {...props}
      />
    );

  const createMatch = (questionnaireId, sectionId, pageId) => ({
    params: {
      questionnaireId,
      sectionId,
      pageId
    }
  });

  beforeEach(() => {
    handleItemChosen = jest.fn();

    questionnaire = {
      id: "1",
      sections: [
        {
          id: "1",
          pages: [
            {
              id: "1",
              answers: [
                { id: "1", label: "Answer 1", type: "TextField" },
                { id: "2", label: "Answer 2", type: "TextField" }
              ]
            },
            {
              id: "2",
              answers: [{ id: "3", label: "Answer 3", type: "TextField" }]
            }
          ]
        },
        {
          id: "2",
          pages: [
            {
              id: "3",
              answers: [
                { id: "4", label: "Answer 4", type: "TextField" },
                { id: "5", label: "Answer 5", type: "TextField" }
              ]
            },
            {
              id: "4",
              answers: [{ id: "6", label: "Answer 6", type: "TextField" }]
            }
          ]
        }
      ]
    };

    const section = questionnaire.sections[0];
    const page = section.pages[1];
    match = createMatch(questionnaire.id, section.id, page.id);
  });

  it("should render", () => {
    const wrapper = render({ data: { questionnaire } });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled when loading", () => {
    const wrapper = render({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled when disabled", () => {
    const wrapper = render({ disabled: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled when no questionnaire", () => {
    const wrapper = render({ data: { questionnaire: null } });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled if on first page of first section", () => {
    const section = questionnaire.sections[0];
    const page = section.pages[0];
    match = createMatch(questionnaire.id, section.id, page.id);
    const wrapper = render();

    expect(wrapper.find(PipingMenuButton).prop("disabled")).toBe(true);
  });

  it("should only allow selection of answers before the current page", () => {
    const section = questionnaire.sections[1];
    const page = section.pages[1];
    match = createMatch(questionnaire.id, section.id, page.id);

    const wrapper = render();
    const data = wrapper.find("[data-test='picker']").prop("data");

    expect({ sections: data }).toMatchSnapshot();
  });

  it("shouldn't show current section if on first page of section", () => {
    const section = questionnaire.sections[1];
    const page = section.pages[0];
    match = createMatch(questionnaire.id, section.id, page.id);

    const wrapper = render();
    const data = wrapper.find("[data-test='picker']").prop("data");

    expect({ sections: data }).toMatchSnapshot();
  });

  it("should filter out checkbox answer types", () => {
    questionnaire.sections[0].pages[0].answers[0].type = CHECKBOX;
    match = createMatch(questionnaire.id, "1", "2");

    const wrapper = render();
    const data = wrapper.find("[data-test='picker']").prop("data");

    expect({ sections: data }).toMatchSnapshot();
  });

  it("should filter out radio answer types", () => {
    questionnaire.sections[0].pages[0].answers[0].type = RADIO;
    match = createMatch(questionnaire.id, "1", "2");

    const wrapper = render();
    const data = wrapper.find("[data-test='picker']").prop("data");

    expect({ sections: data }).toMatchSnapshot();
  });
});
