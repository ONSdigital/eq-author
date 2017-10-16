/* eslint-disable babel/no-invalid-this, no-extend-native */

import React from "react";
import { shallow } from "enzyme";
import QuestionnairesTable, { QuestionnaireLink } from "./QuestionnairesTable";
import DeleteQuestionnaireButton from "./DeleteQuestionnaireButton";
import { getLink } from "utils/UrlUtils";

describe("QuestionnairesTable", () => {
  const questionnaires = [
    {
      id: "1",
      title: "Foo",
      status: "Unpublished",
      theme: "default",
      createdAt: "2017/01/02",
      comments: {
        count: 0,
        unread: false
      },
      sections: [
        {
          id: "1",
          pages: [{ id: "1" }]
        }
      ]
    },
    {
      id: "2",
      title: "Foo",
      status: "Unpublished",
      theme: "default",
      createdAt: "2017/03/04",
      comments: {
        count: 1,
        unread: true
      },
      sections: [
        {
          id: "2",
          pages: [{ id: "2" }]
        }
      ]
    }
  ];

  let handleDeleteQuestionnaire, wrapper, realToLocaleDateString;

  beforeEach(() => {
    handleDeleteQuestionnaire = jest.fn();

    realToLocaleDateString = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = jest.fn(function() {
      return `${this.getDate()}/${this.getMonth() + 1}/${this.getFullYear()}`;
    });

    wrapper = shallow(
      <QuestionnairesTable
        questionnaires={questionnaires}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
      />
    );
  });

  afterEach(() => {
    Date.prototype.toLocaleDateString = realToLocaleDateString;
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow deletion of Questionnaire", () => {
    wrapper
      .find(DeleteQuestionnaireButton)
      .first()
      .simulate("click");

    expect(handleDeleteQuestionnaire).toHaveBeenCalledWith(
      questionnaires[0].id
    );
  });

  it("should construct a url that will navigate to the first section and first page", () => {
    const linkToQuestionnaire = wrapper.find(QuestionnaireLink).first();
    const questionnaire = questionnaires[0];
    const expectedUrl = `#${getLink(
      questionnaire.id,
      questionnaire.sections[0].id,
      questionnaire.sections[0].pages[0].id
    )}`;

    expect(linkToQuestionnaire.props().href).toEqual(expectedUrl);
  });
});
