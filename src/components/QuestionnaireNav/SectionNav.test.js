import React from "react";
import { shallow } from "enzyme";
import SectionNav, { AddPageBtn } from "./SectionNav";

describe("SectionNav", () => {
  let wrapper;
  let handleAddPage, handleDeletePage;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn();
    handleDeletePage = jest.fn();
    wrapper = shallow(
      <SectionNav
        questionnaire={questionnaire}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle 'add page' button clicks", () => {
    wrapper.find(AddPageBtn).simulate("click");
    expect(handleAddPage).toHaveBeenCalledWith(section.id);
  });
});
