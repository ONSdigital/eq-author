import React from "react";
import { shallow } from "enzyme";

import IconButtonDelete from "components/IconButtonDelete";
import DuplicateButton from "components/DuplicateButton";

import Row from "./Row";

describe("Row", () => {
  let questionnaire, handleDeleteQuestionnaire, handleDuplicateQuestionnaire;

  beforeEach(() => {
    questionnaire = {
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
    handleDeleteQuestionnaire = jest.fn();
    handleDuplicateQuestionnaire = jest.fn();
  });

  it("should render", () => {
    const wrapper = shallow(
      <Row
        questionnaire={questionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render as disabled when the id is a duplicate", () => {
    questionnaire.id = "dupe-2";
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
        questionnaire={questionnaire}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    )
      .find(IconButtonDelete)
      .simulate("click");

    expect(handleDeleteQuestionnaire).toHaveBeenCalledWith(questionnaire.id);
  });

  it("should allow duplication of a Questionnaire", () => {
    shallow(
      <Row
        questionnaire={questionnaire}
        onDeleteQuestionnaire={handleDeleteQuestionnaire}
        onDuplicateQuestionnaire={handleDuplicateQuestionnaire}
      />
    )
      .find(DuplicateButton)
      .simulate("click");

    expect(handleDuplicateQuestionnaire).toHaveBeenCalledWith(questionnaire);
  });
});
