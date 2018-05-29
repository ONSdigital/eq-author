import React from "react";
import mountWithRouter from "tests/utils/mountWithRouter";
import { UnwrappedTabs } from "components/Tabs";

let wrapper;

const match = {
  params: { questionnaireId: "1", sectionId: "2", pageId: "3" }
};

describe("components/Nav", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <UnwrappedTabs match={match}>Tab Content</UnwrappedTabs>
    );
  });

  describe("when no pageId", () => {
    it("should render section link", () => {
      const params = { questionnaireId: "123", sectionId: "888", pageId: "" };

      wrapper.setProps({
        match: {
          ...match,
          params
        }
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when pageId present", () => {
    it("should render page link", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
