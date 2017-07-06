import React from "react";
import Breadcrumb from "components/Breadcrumb";
import { shallow } from "enzyme";

describe("components/Breadcrumb", () => {
  const title = "Create questionnaire";
  const wrapper = shallow(<Breadcrumb title={title} />);

  it("renders correctly", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render breadcrumb from props", () => {
    wrapper.contains(title);
  });
});
