import React from "react";
import Button from "components/Button";
import { shallow } from "enzyme";

describe("components/Button", () => {
  let wrapper;

  it("renders according to variant", () => {
    wrapper = shallow(<Button primary>Button</Button>);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<Button secondary>Button</Button>);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<Button tertiary>Button</Button>);
    expect(wrapper).toMatchSnapshot();
    wrapper = shallow(<Button clear>Button</Button>);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders as disabled", () => {
    wrapper = shallow(<Button disabled>Button</Button>);
    expect(wrapper).toMatchSnapshot();
  });
});
