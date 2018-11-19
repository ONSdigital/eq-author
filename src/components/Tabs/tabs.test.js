import React from "react";
import { shallow } from "enzyme";
import { UnwrappedTabs, Tab, activeClassName } from "components/Tabs";

describe("components/Tabs", () => {
  let props;

  beforeEach(() => {
    props = {
      match: { params: { questionnaireId: "1", sectionId: "2", pageId: "3" } },
      children: "Tab Content"
    };
  });

  it("should render with design tab enabled by default", () => {
    const wrapper = shallow(<UnwrappedTabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render link to section if params are for a section", () => {
    delete props.match.params.pageId;
    const wrapper = shallow(<UnwrappedTabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a confirmation link when provided", () => {
    props.match.params.confirmationId = "4";
    const wrapper = shallow(<UnwrappedTabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should enable the preview tab when prop is passed", () => {
    const wrapper = shallow(<UnwrappedTabs {...props} preview />);
    expect(wrapper.find(`[data-test="preview"]`)).toMatchSnapshot();
  });

  it("should enable the routing tab when prop is passed", () => {
    const wrapper = shallow(<UnwrappedTabs {...props} routing />);
    expect(wrapper.find(`[data-test="routing"]`)).toMatchSnapshot();
  });

  it("should provide the activeClassName for the enabled tabs", () => {
    const wrapper = shallow(<UnwrappedTabs {...props} routing preview />);
    wrapper.find(Tab).forEach(node => {
      expect(node.props()).toHaveProperty("activeClassName", activeClassName);
    });
  });

  // it("should link to confirmation and disable routing when confirmation id is present", () => {
  //   const params = {
  //     questionnaireId: "123",
  //     sectionId: "888",
  //     pageId: "123",
  //     confirmationId: "444"
  //   };

  //   wrapper.setProps({
  //     match: {
  //       ...match,
  //       params
  //     }
  //   });

  //   expect(wrapper).toMatchSnapshot();
  // });
});
