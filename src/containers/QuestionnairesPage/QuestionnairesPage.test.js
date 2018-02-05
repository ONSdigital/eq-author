import React from "react";
import Questionnaires from "./QuestionnairesPage";
import { shallow } from "enzyme";
import QuestionnaireSettingsModal from "components/QuestionnaireSettingsModal";
import QuestionnairesTable from "./QuestionnairesTable";

describe("containers/Questionnaires", () => {
  let onDeleteQuestionnaire, questionnaire;

  beforeEach(() => {
    questionnaire = {
      id: "1",
      title: "Test questionnaire",
      createdAt: "01/01/1970",
      createdBy: {
        name: "Mike"
      },
      sections: [
        {
          id: "5",
          pages: [{ id: "10" }]
        }
      ]
    };

    onDeleteQuestionnaire = jest.fn();
  });

  it("should not render table whilst data is loading", () => {
    const props = {
      loading: true,
      onCreateQuestionnaire: jest.fn()
    };
    const wrapper = shallow(<Questionnaires {...props} />);

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

  it("should render table when there are questionnaires", () => {
    const props = {
      questionnaires: [questionnaire],
      onDeleteQuestionnaire,
      onCreateQuestionnaire: jest.fn()
    };
    const wrapper = shallow(<Questionnaires {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  describe("behaviour", () => {
    const openModal = wrapper =>
      wrapper.find("#btn-create-questionnaire").simulate("click");
    const submitForm = wrapper =>
      wrapper.find(QuestionnaireSettingsModal).simulate("submit");
    const isModalOpen = wrapper =>
      wrapper.find(QuestionnaireSettingsModal).prop("isOpen");

    let wrapper, props;

    beforeEach(() => {
      props = {
        onDeleteQuestionnaire: jest.fn(),
        onCreateQuestionnaire: jest.fn()
      };

      wrapper = shallow(<Questionnaires {...props} />);
    });

    it("opens settings modal when clicking Create button", () => {
      expect(isModalOpen(wrapper)).toBe(false);
      openModal(wrapper);
      expect(isModalOpen(wrapper)).toBe(true);
    });

    it("creates questionnaire on submit", () => {
      openModal(wrapper);
      submitForm(wrapper);

      expect(props.onCreateQuestionnaire).toHaveBeenCalled();
    });
  });
});
