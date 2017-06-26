import React from "react";
import Breadcrumb, { BreadcrumbLink } from "components/Breadcrumb";
import { shallow } from "enzyme";

describe("components/Breadcrumb", () => {
  const breadcrumb = {
    title: "Create questionnaire",
    path: "/create"
  };
  const wrapper = shallow(<Breadcrumb breadcrumb={breadcrumb} />);

  it("renders correctly ", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render breadcrumb from props", () => {
    wrapper.contains(
      <BreadcrumbLink to={breadcrumb.path}>{breadcrumb.title}</BreadcrumbLink>
    );
  });
});
