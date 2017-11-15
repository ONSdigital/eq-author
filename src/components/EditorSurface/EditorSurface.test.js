import React from "react";
import { mount, shallow } from "enzyme";
import PropTypes from "prop-types";

import EditorSurface from "./";

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
  let wrapper, mockMutations;

  const createWrapper = (props = {}, render = shallow, renderOpts = {}) => {
    return render(
      <EditorSurface
        section={section}
        page={page}
        {...mockMutations}
        focused={"Section3"}
        {...props}
      />,
      {
        context: {
          store: {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            getState: jest.fn()
          }
        },
        childContextTypes: { store: PropTypes.object },
        ...renderOpts
      }
    );
  };

  beforeEach(() => {
    mockMutations = {
      onUpdateSection: jest.fn(),
      onUpdatePage: jest.fn(),
      onFocus: jest.fn(),
      onBlur: jest.fn()
    };
  });

  it("should render", () => {
    wrapper = createWrapper({}, shallow, {
      disableLifecycleMethods: true
    });
    expect(wrapper).toMatchSnapshot();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe("focus behaviour", () => {
    let sectionSpy, pageSpy;

    beforeEach(() => {
      sectionSpy = { focus: jest.fn() };
      pageSpy = { focus: jest.fn() };
    });

    function createWrapperWithTitles({ section = "", page = "" } = {}) {
      return createWrapper(
        {
          section: {
            __typename: "Section",
            id: "2",
            title: section
          },
          page: {
            __typename: "QuestionPage",
            id: "1",
            title: page,
            answers: []
          }
        },
        shallow,
        { disableLifecycleMethods: true, lifecycleExperimental: false }
      );
    }

    describe("when section title is empty", () => {
      describe("and page title is populated", () => {
        it("should focus on section title", () => {
          wrapper = createWrapperWithTitles({ page: "a page title" }, mount);

          wrapper.instance().setSectionTitle(sectionSpy);
          wrapper.instance().setPageTitle(pageSpy);
          wrapper.instance().setFocusOnTitle();

          expect(sectionSpy.focus).toHaveBeenCalled();
          expect(pageSpy.focus).not.toHaveBeenCalled();
        });
      });

      describe("and page title is empty", () => {
        it("should focus on section title", () => {
          wrapper = createWrapperWithTitles();

          wrapper.instance().setSectionTitle(sectionSpy);
          wrapper.instance().setPageTitle(pageSpy);
          wrapper.instance().setFocusOnTitle();

          expect(sectionSpy.focus).toHaveBeenCalled();
          expect(pageSpy.focus).not.toHaveBeenCalled();
        });
      });
    });

    describe("when section title is populated", () => {
      describe("and page title is empty", () => {
        it("should focus on page title", () => {
          wrapper = createWrapperWithTitles({ section: "a section title" });

          wrapper.instance().setSectionTitle(sectionSpy);
          wrapper.instance().setPageTitle(pageSpy);
          wrapper.instance().setFocusOnTitle();

          expect(pageSpy.focus).toHaveBeenCalled();
          expect(sectionSpy.focus).not.toHaveBeenCalled();
        });
      });

      describe("and page title is populated", () => {
        it("should focus on neither", () => {
          wrapper = createWrapperWithTitles({
            section: "a section title",
            page: "a page title"
          });

          wrapper.instance().setSectionTitle(sectionSpy);
          wrapper.instance().setPageTitle(pageSpy);
          wrapper.instance().setFocusOnTitle();

          expect(pageSpy.focus).not.toHaveBeenCalled();
          expect(sectionSpy.focus).not.toHaveBeenCalled();
        });
      });
    });

    describe("when navigating to new page", () => {
      it("should attempt to move focus", () => {
        wrapper = createWrapper({}, mount);
        const spy = jest.spyOn(wrapper.instance(), "setFocusOnTitle");

        wrapper.setProps({
          page: {
            id: "1",
            title: "I have a title",
            __typename: "QuestionPage",
            answers: []
          }
        });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe("when navigating to same page", () => {
      it("should not attempt to move focus", () => {
        const wrapper = createWrapper({}, mount);
        const spy = jest.spyOn(wrapper.instance(), "setFocusOnTitle");
        wrapper.setProps({ page });

        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
