import React from "react";
import { shallow } from "enzyme";
import Icon from "components/Dialog/Icon";

const createWrapper = (props, render = shallow) => {
  return render(<Icon {...props} />);
};

describe("components/Dialog/Icon", () => {
  it("should render a move icon", () => {
    expect(createWrapper({ icon: "move" })).toMatchSnapshot();
  });

  it("should render a delete icon", () => {
    expect(createWrapper({ icon: "delete" })).toMatchSnapshot();
  });
});
