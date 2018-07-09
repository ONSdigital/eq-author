import React from "react";
import { shallow } from "enzyme";
import { TabsNavItem, TabsNav, TabsBody } from "./Tabs";

let props;

describe("Tabs", () => {
  describe("TabsNavItem", () => {
    beforeEach(() => {
      props = {
        onClick: jest.fn(),
        controls: "tab-1",
        active: false
      };
    });

    it("should render as active/inactive", () => {
      const active = shallow(
        <TabsNavItem {...props} active>
          Active item
        </TabsNavItem>
      );

      const inactive = shallow(
        <TabsNavItem {...props} active={false}>
          Inactive item
        </TabsNavItem>
      );

      expect(active).toMatchSnapshot();
      expect(inactive).toMatchSnapshot();
    });

    it("should have a click handler", () => {
      const wrapper = shallow(<TabsNavItem {...props}>Title</TabsNavItem>);
      wrapper.find("[role='tab']").simulate("click");
      expect(props.onClick).toHaveBeenCalled();
    });
  });

  describe("TabsNav", () => {
    beforeEach(() => {
      props = {
        title: "tab-1"
      };
    });

    it("should render", () => {
      const wrapper = shallow(<TabsNav {...props}>Children</TabsNav>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe("TabsBody", () => {
    beforeEach(() => {
      props = {
        navItemId: "tab-1"
      };
    });

    it("should render ", () => {
      const wrapper = shallow(<TabsBody {...props}>Children</TabsBody>);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
