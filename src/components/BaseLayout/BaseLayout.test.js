import React from "react";
import { shallow } from "enzyme";
import BaseLayout from "components/BaseLayout";

let wrapper;

describe("components/BaseLayout", () => {
  beforeEach(() => {
    wrapper = shallow(
      <BaseLayout docTitle="BaseLayout Test">Children</BaseLayout>
    );
  });

  it("should render", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a Nav", function() {
    wrapper.setProps({ questionnaire: { title: "Questionnaire" } });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render a title", function() {
    wrapper.setProps({ title: "Title" });
    expect(wrapper).toMatchSnapshot();
  });
});
