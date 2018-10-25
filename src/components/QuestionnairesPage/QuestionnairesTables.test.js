import React from "react";
import { shallow } from "enzyme";
import QuestionnairesTable, { Row } from "./QuestionnairesTable";
import IconButtonDelete from "components/IconButtonDelete";
import DuplicateButton from "components/DuplicateButton";

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

  describe("Row", () => {
    it("should render", () => {
      const wrapper = shallow(
        <Row
          questionnaire={questionnaires[0]}
          onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
          onDeleteQuestionnaire={handleDeleteQuestionnaire}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("should render as disabled when the id is a duplicate", () => {
      const questionnaire = {
        ...questionnaires[0],
        id: "dupe-2"
      };
      const wrapper = shallow(
        <Row
          questionnaire={questionnaire}
          onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
          onDeleteQuestionnaire={handleDeleteQuestionnaire}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("should allow deletion of Questionnaire", () => {
      shallow(
        <Row
          questionnaire={questionnaires[0]}
          onDeleteQuestionnaire={handleDeleteQuestionnaire}
          onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
        />
      )
        .find(IconButtonDelete)
        .simulate("click");

      expect(handleDeleteQuestionnaire).toHaveBeenCalledWith(
        questionnaires[0].id
      );
    });

    it("should allow duplication of a Questionnaire", () => {
      shallow(
        <Row
          questionnaire={questionnaires[0]}
          onDeleteQuestionnaire={handleDeleteQuestionnaire}
          onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
        />
      )
        .find(DuplicateButton)
        .simulate("click");

      expect(handleDuplicateQuestionnaire).toHaveBeenCalledWith(
        questionnaires[0]
      );
    });
  });
});
