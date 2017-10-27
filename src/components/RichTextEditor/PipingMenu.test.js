import React from "react";
import { Menu as PipingMenu } from "./PipingMenu";
import { shallow } from "enzyme";
import { CHECKBOX, RADIO } from "constants/answer-types";
import query from "graphql/getQuestionnairePiping.graphql";

describe("PipingMenu", () => {
  let client, match, handleItemChosen, questionnaire;

  const render = (props = {}) =>
    shallow(
      <PipingMenu
        client={client}
        match={match}
        onItemChosen={handleItemChosen}
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

    client = {
      readQuery: jest.fn(() => ({ questionnaire })),
      query: jest.fn()
    };

    const section = questionnaire.sections[0];
    const page = section.pages[1];
    match = createMatch(questionnaire.id, section.id, page.id);
  });

  it("should render", () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  it("should readQuery when constructed", () => {
    const wrapper = render();
    expect(wrapper.state("questionnaire")).toBeDefined();
    expect(client.readQuery).toHaveBeenCalledWith({
      variables: { id: match.params.questionnaireId },
      query
    });
  });

  it("should render as disabled if on first page of first section", () => {
    match.params.pageId = "1";
    const wrapper = render();

    expect(wrapper.prop("disabled")).toBe(true);
  });

  it("should only allow selection of answers before the current page", () => {
    const section = questionnaire.sections[1];
    const page = section.pages[1];
    match = createMatch(questionnaire.id, section.id, page.id);

    const wrapper = render();
    const menu = wrapper.prop("menu");

    expect(menu.props.questionnaire).toMatchSnapshot();
  });

  it("shouldn't show current section if on first page of section", () => {
    const section = questionnaire.sections[1];
    const page = section.pages[0];
    match = createMatch(questionnaire.id, section.id, page.id);

    const wrapper = render();
    const menu = wrapper.prop("menu");

    expect(menu.props.questionnaire).toMatchSnapshot();
  });

  it("should filter out checkbox answer types", () => {
    questionnaire.sections[0].pages[0].answers[0].type = CHECKBOX;
    match = createMatch(questionnaire.id, "1", "2");

    const wrapper = render();
    const menu = wrapper.prop("menu");

    expect(menu.props.questionnaire).toMatchSnapshot();
  });

  it("should filter out radio answer types", () => {
    questionnaire.sections[0].pages[0].answers[0].type = RADIO;
    match = createMatch(questionnaire.id, "1", "2");

    const wrapper = render();
    const menu = wrapper.prop("menu");

    expect(menu.props.questionnaire).toMatchSnapshot();
  });
});
