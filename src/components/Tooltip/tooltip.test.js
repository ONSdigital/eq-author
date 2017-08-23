import React from "react";
import { shallow } from "enzyme";
import Tooltip from "./index";

describe("Tooltip", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Tooltip tooltipId="buttonTooltip" tooltipText="This is a button">
        <button>Click me</button>
      </Tooltip>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
