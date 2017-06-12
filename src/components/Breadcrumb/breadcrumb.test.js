import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "components/Breadcrumb";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

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
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should render breadcrumbs from props", () => {
    expect(wrapper.find(Link).length).toBe(breadcrumbs.length);
    breadcrumbs.forEach(({ title, path }) =>
      expect(wrapper.contains(<Link to={path}>{title}</Link>)).toBe(true)
    );
  });
});
