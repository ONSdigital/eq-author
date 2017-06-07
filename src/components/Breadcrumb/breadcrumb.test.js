import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb";
import { shallow } from "enzyme";

describe("components/Breadcrumb", () => {
  const breadcrumbs = [
    {
      title: "Home",
      path: "/"
    },
    {
      title: "Create Survey",
      path: "/create"
    }
  ];
  const wrapper = shallow(<Breadcrumb breadcrumbs={breadcrumbs} />);

  it("renders correctly ", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render breadcrumbs from props", () => {
    expect(wrapper.find(Link).length).toBe(breadcrumbs.length);
    breadcrumbs.forEach(({ title, path }) =>
      expect(wrapper.contains(<Link to={path}>{title}</Link>)).toBe(true)
    );
  });
});
