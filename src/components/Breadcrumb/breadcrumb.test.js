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

import { mapStateToProps, mapResultsToProps } from "containers/Breadcrumb";

describe("containers/Breadcrumb", () => {
  it("should map router location state to pathname", function() {
    const { pathname } = mapStateToProps({
      router: {
        location: {
          pathname: "/create"
        }
      }
    });

    expect(pathname).toEqual("/create");
  });

  it("should use title of route when on /create", () => {
    expect(
      mapResultsToProps({
        data: {},
        ownProps: { pathname: "/create" }
      })
    ).toEqual({
      breadcrumbs: [
        { title: "Home", pathname: "/" },
        { title: "New questionnaire", pathname: "/create" }
      ]
    });
  });

  it("should use title of questionnaire when on /design", () => {
    expect(
      mapResultsToProps({
        data: { questionnaire: { title: "My Questionnaire" } },
        ownProps: { pathname: "/design" }
      })
    ).toEqual({
      breadcrumbs: [
        { title: "Home", pathname: "/" },
        { title: "My Questionnaire", pathname: "/design" }
      ]
    });
  });
});
