import React from "react";
import Questionnaires from "./QuestionnairesPage";
import { shallow, mount } from "enzyme";
import shallowWithRouter from "tests/utils/shallowWithRouter";
import PropTypes from "prop-types";
import createRouterContext from "react-router-test-context";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";

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
      onDeleteQuestionnaire,
      onCreateQuestionnaire: jest.fn()
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are no questionnaires", () => {
    const props = {
      questionnaires: [],
      onDeleteQuestionnaire,
      onCreateQuestionnaire: jest.fn()
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should render when there are questionnaires", () => {
    const props = {
      questionnaires: [questionnaire],
      onDeleteQuestionnaire,
      onCreateQuestionnaire: jest.fn()
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  it("should not render table whilst data is loading", () => {
    const props = {
      loading: true,
      onCreateQuestionnaire: jest.fn()
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe("behaviour", () => {
    let context;

    beforeEach(() => {
      context = {
        context: {
          store: {
            subscribe: jest.fn(),
            getState: jest.fn(() => ({
              toasts: {}
            })),
            dispatch: jest.fn()
          },
          router: createRouterContext().router
        },
        childContextTypes: {
          router: PropTypes.object,
          store: PropTypes.object
        }
      };

      const container = document.createElement("div");
      container.id = "toast";
      document.body.appendChild(container);
    });

    it("opens settings modal when clicking Create button", () => {
      const props = {
        onDeleteQuestionnaire: jest.fn(),
        onCreateQuestionnaire: jest.fn()
      };

      const wrapper = mount(<Questionnaires {...props} />, context);

      expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(
        false
      );
      wrapper.find("Button").simulate("click");
      expect(wrapper.find(QuestionnaireSettingsModal).prop("isOpen")).toBe(
        true
      );
    });

    it("creates questionnaire on submit", () => {
      const props = {
        onDeleteQuestionnaire: jest.fn(),
        onCreateQuestionnaire: jest.fn()
      };

      const wrapper = mount(<Questionnaires {...props} />, context);

      wrapper.find("Button").simulate("click");
      wrapper.find("form").simulate("submit");
      expect(props.onCreateQuestionnaire).toHaveBeenCalled();
    });
  });
});
