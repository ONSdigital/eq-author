import React from "react";
import Questionnaires from "./QuestionnairesPage";
import { shallow } from "enzyme";
import { merge } from "lodash";
import mountWithRouter from "tests/utils/mountWithRouter";

describe("containers/Questionnaires", () => {
  const createWrapper = props => {
    return mountWithRouter(<Questionnaires {...props} />);
  };

  let onDeleteQuestionnaire;

  const questionnaire = {
    id: 1,
    title: "Test questionnaire",
    createdAt: "01/01/1970",
    theme: "default",
    comments: {
      count: 0,
      unread: false
    },
    actions: {
      delete: true
    },
    sections: [
      {
        id: 5,
        pages: [
          {
            id: 10
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
    expect(wrapper.find("#btn-create-questionnaire").length).toBe(1);
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

  it("should render an icon when there are comments", () => {
    const props = {
      questionnaires: [
        merge({}, questionnaire, {
          comments: {
            count: 10
          }
        })
      ],
      onDeleteQuestionnaire
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render a notification when there are unread comments", () => {
    const props = {
      questionnaires: [
        merge({}, questionnaire, {
          comments: {
            comments: 10,
            unread: true
          }
        })
      ],
      onDeleteQuestionnaire
    };
    const wrapper = createWrapper(props);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render without the delete button", () => {
    const props = {
      questionnaires: [
        merge({}, questionnaire, {
          actions: {
            delete: false
          }
        })
      ],
      onDeleteQuestionnaire
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should call delete handler when delete button is pressed", () => {
    const wrapper = createWrapper({
      questionnaires: [questionnaire],
      onDeleteQuestionnaire
    });

    const deleteButton = wrapper.find("button").last();
    deleteButton.simulate("click");

    expect(onDeleteQuestionnaire).toHaveBeenCalledWith(questionnaire.id);
  });

  it("should construct a url that will navigate to the first section and first page", () => {
    const wrapper = createWrapper({
      questionnaires: [questionnaire],
      onDeleteQuestionnaire
    });

    const linkToQuestionnaire = wrapper.find("a").last();
    const expectedUrl = `/questionnaire/${questionnaire.id}/design/${questionnaire
      .sections[0].id}/${questionnaire.sections[0].pages[0].id}/`;
    expect(linkToQuestionnaire.props().href).toEqual(expectedUrl);
  });
});
