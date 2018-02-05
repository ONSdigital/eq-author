import React from "react";
import withModal from "./";
import { shallow } from "enzyme";

const Component = props => <div {...props} />;

describe("withModal", () => {
  const ComponentWithModal = withModal(Component);

  it("should have an appropriate displayName", () => {
    expect(ComponentWithModal.displayName).toBe(
      `withModal(${Component.displayName})`
    );
  });

  it("should pass on props", () => {
    const wrapper = shallow(<ComponentWithModal foo="bar" />);
    expect(wrapper).toMatchSnapshot();
  });

  it("allows modal to be opened and closed", () => {
    const wrapper = shallow(<ComponentWithModal />);

    wrapper.simulate("modalOpen");
    expect(wrapper).toMatchSnapshot("opened");

    wrapper.simulate("modalClose");
    expect(wrapper).toMatchSnapshot("closed");
  });
});
