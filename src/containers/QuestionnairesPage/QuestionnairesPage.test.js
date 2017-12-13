import React from "react";
import Questionnaires from "./QuestionnairesPage";
import { shallow } from "enzyme";
import shallowWithRouter from "tests/utils/shallowWithRouter";

describe("containers/Questionnaires", () => {
  const createWrapper = props =>
    shallowWithRouter(<Questionnaires {...props} />);

  let onDeleteQuestionnaire;

  const questionnaire = {
    id: "1",
    title: "Test questionnaire",
    createdAt: "01/01/1970",
    createdBy: {
      name: "Mike"
    },
    sections: [
      {
        id: "5",
        pages: [
          {
            id: "10"
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    onDeleteQuestionnaire = jest.fn();
  });

  it("should render a 'Create Questionnaire' button", () => {
    const wrapper = createWrapper({
      questionnaires: [],
      onDeleteQuestionnaire
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are no questionnaires", () => {
    const props = {
      questionnaires: [],
      onDeleteQuestionnaire
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are questionnaires", () => {
    const props = {
      questionnaires: [questionnaire],
      onDeleteQuestionnaire
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should not render table whilst data is loading", () => {
    const props = {
      loading: true
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
