import React from "react";
import { shallow } from "enzyme";
import { Label } from "components/Forms/Label";

let wrapper;

describe("components/Forms/Label", () => {
  beforeEach(() => {
    wrapper = shallow(<Label id="name">Name</Label>);
  });

  it("should render correctly", function() {
    expect(wrapper).toMatchSnapshot();
  });

  it("should map `id` prop onto `htmlFor` attribute", () => {
    expect(wrapper.props().htmlFor).toEqual("name");
  });

  it("should pass on arbitrary props", () => {
    wrapper = shallow(<Label foo="bar" bar="foo">Foo</Label>);
    expect(wrapper.props().foo).toEqual("bar");
    expect(wrapper.props().bar).toEqual("foo");
  });
});
