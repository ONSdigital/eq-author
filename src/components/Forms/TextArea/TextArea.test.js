import React from "react";
import { shallow } from "enzyme";
import { TextArea } from "components/Forms/TextArea";

describe("components/Forms/TextArea", () => {
  it("should render correctly", function() {
    const wrapper = shallow(<TextArea value="" />);
    expect(wrapper).toMatchSnapshot();
  });
});
