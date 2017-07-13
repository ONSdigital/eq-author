import React from "react";
import { shallow } from "enzyme";
import BaseLayout from "components/BaseLayout";

let wrapper;

describe("components/BaseLayout", () => {
  beforeEach(() => {
    wrapper = shallow(<BaseLayout>Children</BaseLayout>);
  });

  it("shoulder render", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("shoulder render a Nav", function() {
    wrapper.setProps({ questionnaire: { title: "Questionnaire" } });
    expect(wrapper).toMatchSnapshot();
  });

  it("shoulder render a title", function() {
    wrapper.setProps({ title: "Questionnaire" });
    expect(wrapper).toMatchSnapshot();
  });
});
