import React from "react";
import Breadcrumb, { BreadcrumbLink } from "components/Breadcrumb";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

describe("components/Breadcrumb", () => {
  const breadcrumbs = [
    {
      title: "Home",
      pathname: "/"
    },
    {
      title: "Create Survey",
      pathname: "/create"
    }
  ];
  const wrapper = shallow(<Breadcrumb breadcrumbs={breadcrumbs} />);

  it("renders correctly ", function() {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render breadcrumbs from props", () => {
    expect(wrapper.find(BreadcrumbLink).length).toBe(breadcrumbs.length);
    breadcrumbs.forEach(({ title, pathname }) =>
      expect(
        wrapper.contains(<BreadcrumbLink to={pathname}>{title}</BreadcrumbLink>)
      ).toBe(true)
    );
  });
});
