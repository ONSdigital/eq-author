import React from "react";
import { shallow } from "enzyme";
import QuestionnairesTable from "./QuestionnairesTable";
import IconButtonDelete from "components/IconButtonDelete";

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

  let handleDeleteQuestionnaire, handleDuplicateQuestionnaire, wrapper;

  beforeEach(() => {
    handleDeleteQuestionnaire = jest.fn();
    handleDuplicateQuestionnaire = jest.fn();

    wrapper = shallow(
      <QuestionnairesTable
        questionnaires={questionnaires}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render message when no questionnaires", () => {
    wrapper = shallow(
      <QuestionnairesTable
        questionnaires={[]}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should allow deletion of Questionnaire", () => {
    wrapper
      .find(IconButtonDelete)
      .first()
      .simulate("click");

    expect(handleDeleteQuestionnaire).toHaveBeenCalledWith(
      questionnaires[0].id
    );
  });

  it("should allow duplication of a Questionnaire", () => {
    wrapper
      .find('[data-test="btn-duplicate-questionnaire"]')
      .first()
      .simulate("click");

    expect(handleDuplicateQuestionnaire).toHaveBeenCalledWith(
      questionnaires[0].id
    );
  });
});
