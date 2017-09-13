import React from "react";
import { mount, shallow } from "enzyme";
import EditorSurface from "./";

const option = {
  __typename: "Option",
  id: 0,
  label: "",
  description: ""
};

const answer = {
  __typename: "MultipleChoiceAnswer",
  id: 1,
  type: "Checkbox",
  options: [option]
};

const page = {
  __typename: "Page",
  id: 2,
  title: "",
  answers: [answer]
};

const section = {
  __typename: "Section",
  id: 3,
  title: "",
  pages: [page]
};

describe("EditorSurface", () => {
  let wrapper;
  let mockMutations;

  const createWrapper = (props, render = mount) => {
    return render(
      <EditorSurface
        section={section}
        page={page}
        {...mockMutations}
        focused={"Section3"}
        {...props}
      />
    );
  };

  beforeEach(() => {
    mockMutations = {
      onUpdateSection: jest.fn(),
      onUpdatePage: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
    wrapper = createWrapper();
  });

  it("should render", () => {
    wrapper = createWrapper({}, shallow);

    expect(wrapper).toMatchSnapshot();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe("focus behaviour", () => {
    function createWrapperWithTitles({ section = "", page = "" } = {}) {
      return createWrapper(
        {
          section: {
            __typename: "Section",
            id: 2,
            title: section
          },
          page: {
            __typename: "QuestionPage",
            id: 1,
            title: page,
            answers: []
          }
        },
        mount
      );
    }

    describe("when section title is empty", () => {
      describe("and page title is populated", () => {
        it("should focus on section title", () => {
          wrapper = createWrapperWithTitles({
            page: "a page title"
          });

          const sectionInput = wrapper.find(
            "#section-editor input[name='title']"
          );
          expect(sectionInput.matchesElement(document.activeElement)).toBe(
            true
          );
        });
      });

      describe("and page title is empty", () => {
        it("should focus on section title", () => {
          wrapper = createWrapperWithTitles();

          const sectionInput = wrapper.find(
            "#section-editor input[name='title']"
          );
          expect(sectionInput.matchesElement(document.activeElement)).toBe(
            true
          );
        });
      });
    });

    describe("when section title is populated", () => {
      describe("and page title is empty", () => {
        it("should focus on page title", () => {
          wrapper = createWrapperWithTitles({
            section: "a section title"
          });

          const sectionInput = wrapper.find(
            "#question-page-editor input[name='title']"
          );
          expect(sectionInput.matchesElement(document.activeElement)).toBe(
            true
          );
        });
      });

      describe("and page title is populated", () => {
        it("should focus on neither", () => {
          wrapper = createWrapperWithTitles({
            section: "a section title",
            page: "a page title"
          });

          const pageInput = wrapper.find(
            "#question-page-editor input[name='title']"
          );
          const sectionInput = wrapper.find(
            "#section-editor input[name='title']"
          );

          expect(pageInput.matchesElement(document.activeElement)).toBe(false);
          expect(sectionInput.matchesElement(document.activeElement)).toBe(
            false
          );
        });
      });
    });

    describe("when navigating to new page", () => {
      it("should attempt to move focus", () => {
        const spy = jest.spyOn(wrapper.instance(), "setFocusOnTitle");
        wrapper.setProps({
          page: {
            id: 1,
            title: "I have a title",
            __typename: "QuestionPage",
            answers: []
          }
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe("when navigating to same page", () => {
      it("should attempt to move focus", () => {
        const spy = jest.spyOn(wrapper.instance(), "setFocusOnTitle");
        wrapper.setProps({ page });

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
