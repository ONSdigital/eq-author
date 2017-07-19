import React from "react";
import { shallow } from "enzyme";
import QuestionnaireNav, { AddSectionBtn } from "components/QuestionnaireNav";

describe("QuestionnaireNav", () => {
  let wrapper;
  const questionnaire = { id: "1" };
  const handleAddSectionClick = jest.fn();
  const handleAddPageClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <QuestionnaireNav
        questionnaire={questionnaire}
        onAddPageClick={handleAddPageClick}
        onAddSectionClick={handleAddSectionClick}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle clicks on `create a new section`", () => {
    wrapper.find(AddSectionBtn).simulate("click");
    expect(handleAddSectionClick).toHaveBeenCalledWith(questionnaire.id);
  });
});
