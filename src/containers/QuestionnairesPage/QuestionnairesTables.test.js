import React from "react";
import { shallow } from "enzyme";
import QuestionnairesTable, { DeleteButton } from "./QuestionnairesTable";

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

  let handleDeleteQuestionnaire, wrapper;

  beforeEach(() => {
    handleDeleteQuestionnaire = jest.fn();

    wrapper = shallow(
      <QuestionnairesTable
        questionnaires={questionnaires}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow deletion of Questionnaire", () => {
    wrapper
      .find(DeleteButton)
      .first()
      .simulate("click");

    expect(handleDeleteQuestionnaire).toHaveBeenCalledWith(
      questionnaires[0].id
    );
  });
});
