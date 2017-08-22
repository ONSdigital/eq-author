import React from "react";
import { shallow } from "enzyme";
import QuestionnaireNav, { AddSectionBtn } from "components/QuestionnaireNav";

describe("QuestionnaireNav", () => {
  let wrapper;
  const questionnaire = { id: "1" };
  const handleAddSection = jest.fn();
  const handleAddPage = jest.fn();
  const handleDeletePage = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <QuestionnaireNav
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onAddSection={handleAddSection}
        onDeletePage={handleDeletePage}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle clicks on `create a new section`", () => {
    wrapper.find(AddSectionBtn).simulate("click");
    expect(handleAddSection).toHaveBeenCalledWith(questionnaire.id);
  });
});
