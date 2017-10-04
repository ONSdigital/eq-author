import React from "react";
import mountWithRouter from "tests/utils/mountWithRouter";
import QuestionnaireNav, { AddSectionBtn } from "components/QuestionnaireNav";

describe("QuestionnaireNav", () => {
  let wrapper;
  const page = { id: "1", title: "Page 1" };
  const section = { id: "1", title: "Section 1", pages: [page] };
  const questionnaire = { id: "3", sections: [section] };

  const handleAddSection = jest.fn(() => Promise.resolve(section));
  const handleAddPage = jest.fn();
  const handleDeletePage = jest.fn();

  beforeEach(() => {
    wrapper = mountWithRouter(
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
