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
      <Link key="1" text="Home" data="home" onClick={stubOnClick} />,
      <Link
        key="2"
        text="Survey title"
        data="surveyTitle"
        onClick={stubOnClick}
      />
    ];

    const threeLinks = concat(twoLinks, [
      <Link key="3" text="Third link" data="thirdLink" onClick={stubOnClick} />
    ]);

    const BreadcrumbWithTwoLinks = props => (
      <Breadcrumb>
        {twoLinks}
      </Breadcrumb>
    );

    const BreadcrumbWithThreeLinks = props => (
      <Breadcrumb>
        {threeLinks}
      </Breadcrumb>
    );

    it("should display links", () => {
      const wrapper = mount(<BreadcrumbWithTwoLinks />);
      expect(wrapper.find("a")).toHaveLength(2);
    });

    it("should have 1 chevron when two links", () => {
      const breadcrumbWithTwoLinks = mount(<BreadcrumbWithTwoLinks />);
      expect(breadcrumbWithTwoLinks.find(Chevron)).toHaveLength(1);
    });

    it("should have 2 chevrons when three links", () => {
      const breadcrumbWithThreeLinks = mount(<BreadcrumbWithThreeLinks />);
      expect(breadcrumbWithThreeLinks.find(Chevron)).toHaveLength(2);
    });
  });
});
