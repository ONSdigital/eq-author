import React from "react";
import Breadcrumb, { BreadcrumbLink } from "components/Breadcrumb";
import { shallow } from "enzyme";

describe("components/Breadcrumb", () => {
  const breadcrumbs = [
    {
      title: "Home",
      pathname: "/"
    },
    {
      title: "Create questionnaire",
      pathname: "/create"
    }
  ];
  const wrapper = shallow(<Breadcrumb breadcrumbs={breadcrumbs} />);

  it("renders correctly ", function() {
    expect(wrapper).toMatchSnapshot();
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
