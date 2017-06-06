import React from "react";
import { concat } from "lodash";
import Link from "components/Link";
import Breadcrumb from "components/Breadcrumb";
import Chevron from "./chevron";
import { mount } from "enzyme";

describe("Breadcrumb", () => {
  describe("links", () => {
    const stubOnClick = jest.fn();
    const twoLinks = [
      <Link text="Home" data="home" onClick={stubOnClick} />,
      <Link text="Survey title" data="surveyTitle" onClick={stubOnClick} />
    ];

    const threeLinks = concat(twoLinks, [
      <Link text="Third link" data="thirdLink" onClick={stubOnClick} />
    ]);

    it("should should display links", () => {
      const wrapper = mount(<Breadcrumb links={twoLinks} />);
      expect(wrapper.find("a")).toHaveLength(2);
    });

    it("should have 1 chevron when two links", () => {
      const breadcrumbWithTwoLinks = mount(<Breadcrumb links={twoLinks} />);
      expect(breadcrumbWithTwoLinks.find(Chevron)).toHaveLength(1);
    });

    it("should have 2 chevrons when three links", () => {
      const breadcrumbWithThreeLinks = mount(<Breadcrumb links={threeLinks} />);
      expect(breadcrumbWithThreeLinks.find(Chevron)).toHaveLength(2);
    });
  });
});
