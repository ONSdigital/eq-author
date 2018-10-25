import React from "react";
import { shallow } from "enzyme";

import QuestionnairesTable from "./";

describe("QuestionnairesTable", () => {
  const questionnaires = [
    {
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
    },
    {
      id: "2",
      title: "Bar",
      createdAt: "2017/03/04",
      sections: [
        {
          id: "2",
          pages: [{ id: "2" }]
        }
      ],
      createdBy: {
        name: "Lynn"
      }
    }
  ];

  let handleDeleteQuestionnaire, handleDuplicateQuestionnaire;

  beforeEach(() => {
    handleDeleteQuestionnaire = jest.fn();
    handleDuplicateQuestionnaire = jest.fn();
  });

  it("should render", () => {
    const wrapper = shallow(
      <QuestionnairesTable
        questionnaires={questionnaires}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render message when no questionnaires", () => {
    const wrapper = shallow(
      <QuestionnairesTable
        questionnaires={[]}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
