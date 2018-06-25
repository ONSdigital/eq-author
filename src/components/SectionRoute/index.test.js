import React from "react";
import { mount } from "enzyme";
import SectionRoute, { UnwrappedSectionRoute } from "./";
import TestProvider from "tests/utils/TestProvider";
import { buildSectionPath } from "utils/UrlUtils";
import flushPromises from "tests/utils/flushPromises";
import createRouterContext from "react-router-test-context";
import PropTypes from "prop-types";

import query from "./Section.graphql";

describe("SectionRoute", () => {
  let store, match, context, childContextTypes;

  beforeEach(() => {
    childContextTypes = { router: PropTypes.object };

    match = {
      params: { questionnaireId: "1", sectionId: "2" }
    };

    store = {
      getState: jest.fn(() => ({
        toasts: {},
        saving: { online: true }
      })),
      subscribe: jest.fn(),
      dispatch: jest.fn()
    };

    context = createRouterContext({
      location: { pathname: buildSectionPath(match.params) },
      match
    });
  });

  describe("data fetching", () => {
    const render = mocks =>
      mount(
        <TestProvider reduxProps={{ store }} apolloProps={{ mocks }}>
          <SectionRoute match={match} />
        </TestProvider>,
        { context, childContextTypes }
      );

    it("should show loading spinner while request in flight", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "2"
          }
        },
        result: {
          data: {
            section: {
              __typename: "Section",
              id: "1",
              title: "foo",
              description: "bar"
            }
          }
        }
      };

      const wrapper = render([mock]);
      expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(true);
      expect(wrapper.find(`[data-test="section-editor"]`).exists()).toBe(false);
    });

    it("should render the editor once loaded", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "2"
          }
        },
        result: {
          data: {
            section: {
              __typename: "Section",
              id: "1",
              title: "foo",
              description: "bar"
            }
          }
        }
      };

      const wrapper = render([mock, mock]);

      return flushPromises().then(() => {
        wrapper.update();
        expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(false);
        expect(wrapper.find(`[data-test="section-editor"]`).exists()).toBe(
          true
        );
      });
    });

    it("should render error if problem with request", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "2"
          }
        },
        error: new Error("something went wrong")
      };

      const wrapper = render([mock]);

      return flushPromises().then(() => {
        wrapper.update();
        expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(false);
        expect(wrapper.find(`[data-test="section-editor"]`).exists()).toBe(
          false
        );
        expect(wrapper.find(`[data-test="error"]`).exists()).toBe(true);
      });
    });

    it("should render error if no section returned", () => {
      const mock = {
        request: {
          query,
          variables: {
            id: "2"
          }
        },
        result: {
          data: {
            section: null
          }
        }
      };

      const wrapper = render([mock]);

      return flushPromises().then(() => {
        wrapper.update();
        expect(wrapper.find(`[data-test="loading"]`).exists()).toBe(false);
        expect(wrapper.find(`[data-test="section-editor"]`).exists()).toBe(
          false
        );
        expect(wrapper.find(`[data-test="error"]`).exists()).toBe(true);
      });
    });
  });

  describe("behaviour", () => {
    const render = (props = {}) =>
      mount(
        <TestProvider reduxProps={{ store }} apolloProps={{ mocks: [] }}>
          <UnwrappedSectionRoute {...props} />
        </TestProvider>,
        { context, childContextTypes }
      );

    it("ensures confirmation before delete", () => {
      const data = {
        section: {
          id: "1",
          title: "foo",
          description: "bar"
        }
      };

      const mockHandlers = {
        onUpdateSection: jest.fn(),
        onDeleteSection: jest.fn(),
        onAddPage: jest.fn()
      };

      const wrapper = render({
        loading: false,
        match,
        data,
        ...mockHandlers
      });

      wrapper
        .find(`[data-test="btn-delete"]`)
        .first()
        .simulate("click");

      wrapper
        .find(`[data-test="btn-delete-modal"]`)
        .first()
        .simulate("click");

      expect(mockHandlers.onDeleteSection).toHaveBeenCalledWith("2");
    });

    it("allows new pages to be added", () => {
      const data = {
        section: {
          id: "1",
          title: "foo",
          description: "bar"
        }
      };

      const mockHandlers = {
        onUpdateSection: jest.fn(),
        onDeleteSection: jest.fn(),
        onAddPage: jest.fn()
      };

      const wrapper = render({
        loading: false,
        match,
        data,
        ...mockHandlers
      });

      wrapper
        .find(`[data-test="btn-add-page"]`)
        .first()
        .simulate("click");

      expect(mockHandlers.onAddPage).toHaveBeenCalledWith(
        match.params.sectionId,
        0
      );
    });
  });
});
