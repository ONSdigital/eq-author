import React from "react";
import { shallow } from "enzyme";
import BaseLayout from "components/BaseLayout";

describe("components/BaseLayout", () => {
  it("shoulder render", function() {
    const wrapper = shallow(<BaseLayout>Children</BaseLayout>);
    expect(wrapper).toMatchSnapshot();
  });
});
