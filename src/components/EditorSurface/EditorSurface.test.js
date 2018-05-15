import React from "react";
import { shallow } from "enzyme";
import { UnwrappedEditorSurface } from "./";

import { SynchronousPromise } from "synchronous-promise";

const option = {
  __typename: "Option",
  id: "0",
  label: "",
  description: ""
};

const answer = {
  __typename: "MultipleChoiceAnswer",
  id: "1",
  type: "Checkbox",
  options: [option]
};

const page = {
  __typename: "Page",
  id: "2",
  title: "",
  answers: [answer]
};

const section = {
  __typename: "Section",
  id: "3",
  title: "",
  pages: [page]
};

describe("EditorSurface", () => {
  let wrapper, mockHandlers;

  const render = (props = {}) =>
    shallow(<UnwrappedEditorSurface {...mockHandlers} {...props} />);

  const btnDelete = () => wrapper.find("[data-test='btn-delete']");
  const btnMove = () => wrapper.find("[data-test='btn-move']");

  beforeEach(() => {
    mockHandlers = {
      onUpdateSection: jest.fn(),
      onDeleteSection: jest.fn(() => SynchronousPromise.resolve()),
      onUpdatePage: jest.fn(),
      onDeletePage: jest.fn(() => SynchronousPromise.resolve()),
      onMovePage: jest.fn(),
      onCloseMovePageDialog: jest.fn()
    };
  });

  describe("Editing Question Page", () => {
    const questionPageEditor = () =>
      wrapper.find('[data-test="question-page-editor"]');

    beforeEach(() => {
      wrapper = render({ page, section }, shallow);
    });

    it("should render as expected", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should allow updating page content", () => {
      questionPageEditor().simulate("updatePage");
      expect(mockHandlers.onUpdatePage).toHaveBeenCalled();
    });

    describe("Deleting pages", () => {
      it("should show delete page dialog when delete button is clicked", () => {
        btnDelete().simulate("click");
        expect(questionPageEditor().prop("showDeleteConfirmDialog")).toBe(true);
      });

      it("Should delete page and close modal when deletion is confirmed ", () => {
        btnDelete().simulate("click");
        questionPageEditor().simulate("deletePageConfirm");
        expect(mockHandlers.onDeletePage).toHaveBeenCalledWith(
          section.id,
          page.id
        );
        expect(questionPageEditor().prop("showDeleteConfirmDialog")).toBe(
          false
        );
      });
    });

    describe("Moving pages", () => {
      it("should show move page dialog when move button is clicked", () => {
        btnMove().simulate("click");
        expect(questionPageEditor().prop("showMovePageDialog")).toBe(true);
      });

      it("Should allow closing move page dialog without moving the page.", () => {
        questionPageEditor().simulate("closeMovePageDialog");
        expect(mockHandlers.onMovePage).toHaveBeenCalledTimes(0);
        expect(questionPageEditor().prop("showDeleteConfirmDialog")).toBe(
          false
        );
      });
    });
  });

  describe("Editing Section", () => {
    const sectionEditor = () => wrapper.find('[data-test="section-editor"]');

    beforeEach(() => {
      wrapper = render({ section });
    });

    it("Should render as expected", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("Should allow updating section content", () => {
      sectionEditor().simulate("update");
      expect(mockHandlers.onUpdateSection).toHaveBeenCalled();
    });

    describe("Deleting section", () => {
      it("should show delete section dialog when delete button is clicked", () => {
        btnDelete().simulate("click");
        expect(sectionEditor().prop("showDeleteConfirmDialog")).toBe(true);
      });

      it("Should delete section and close modal when deletion is confirmed ", () => {
        btnDelete().simulate("click");
        sectionEditor().simulate("deleteSectionConfirm");
        expect(mockHandlers.onDeleteSection).toHaveBeenCalledWith(section.id);
        expect(sectionEditor().prop("showDeleteConfirmDialog")).toBe(false);
      });
    });
  });
});
