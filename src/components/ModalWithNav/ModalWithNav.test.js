import React from "react";
import { shallow } from "enzyme";
import { UnconnectedModalWithNav } from "components/ModalWithNav";
import { first, last } from "lodash";
import { NAV_ITEMS } from "./ModalWithNav.story";

describe("ModalWithNav", () => {
  let wrapper, props;

  beforeEach(() => {
    props = {
      id: "TEST_MODAL",
      title: "I am a title",
      onClose: jest.fn(),
      gotoTab: jest.fn(),
      navItems: NAV_ITEMS,
      defaultActiveTabId: NAV_ITEMS[2].id
    };
  });

  it("should render a list of items", () => {
    wrapper = shallow(<UnconnectedModalWithNav {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render an open modal", () => {
    wrapper = shallow(<UnconnectedModalWithNav {...props} isOpen />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should use default active tab id to navigate to a tab", () => {
    wrapper = shallow(
      <UnconnectedModalWithNav
        {...props}
        defaultActiveTabId={NAV_ITEMS[1].id}
      />
    );
    expect(wrapper.find("[data-test='tabs-nav-item']")).toMatchSnapshot();
    expect(wrapper.find("[data-test='tabs-body']")).toMatchSnapshot();
  });

  it("should override the default active tab when receiving the active tab", () => {
    wrapper = shallow(
      <UnconnectedModalWithNav
        {...props}
        defaultActiveTabId={NAV_ITEMS[1].id}
        activeTabId={NAV_ITEMS[0].id}
      />
    );
    expect(wrapper.find("[data-test='tabs-nav-item']")).toMatchSnapshot();
    expect(wrapper.find("[data-test='tabs-body']")).toMatchSnapshot();
  });

  it("should navigate between tabs when button is clicked", () => {
    wrapper = shallow(<UnconnectedModalWithNav {...props} />);
    const navItems = wrapper.find("[data-test='tabs-nav-item']");
    navItems.first().simulate("click");
    expect(props.gotoTab).toHaveBeenCalledWith(props.id, first(NAV_ITEMS).id);

    navItems.last().simulate("click");
    expect(props.gotoTab).toHaveBeenCalledWith(props.id, last(NAV_ITEMS).id);
  });

  it("should close when done button is clicked", () => {
    wrapper = shallow(<UnconnectedModalWithNav {...props} />);
    wrapper.find("[data-test='btn-done']").simulate("click");
    expect(props.onClose).toHaveBeenCalled();
  });
});
