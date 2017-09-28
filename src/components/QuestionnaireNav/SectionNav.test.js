import React from "react";
import { shallow } from "enzyme";
import SectionNav, { AddPageBtn, getFirstPage } from "./SectionNav";

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

  describe("getFirstPage", () => {
    it("should return the first page in the array when the section has single page", () => {
      expect(getFirstPage(section)).toBe(page);
    });

    it("should return the first page in the array when the section has multiple pages", () => {
      section.pages.push({ ...page, id: 3 });

      expect(getFirstPage(section)).toBe(page);
    });

    it("should return an optimistic response when the section doesn't yet have any pages", () => {
      section.pages = [];

      expect(getFirstPage(section)).toEqual({ id: "-1" });
    });
  });
});
