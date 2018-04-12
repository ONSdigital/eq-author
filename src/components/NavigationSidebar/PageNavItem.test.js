import React from "react";
import { shallow } from "enzyme";
import PageNavItem, { LinkText } from "./PageNavItem";

describe("PageNavItem", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PageNavItem
        questionnaireId={"1"}
        sectionId={"2"}
        pageId={"3"}
        title="Title"
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  describe("LinkText", () => {
    it("should be opaque", () => {
      const wrapper = shallow(<LinkText />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should be partially transparent if fade prop passed", () => {
      const wrapper = shallow(<LinkText fade />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
