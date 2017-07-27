import React from "react";
import { shallow } from "enzyme";
import ScaleTransition from "./ScaleTransition";

describe("components/Popout/ScaleTransition", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <ScaleTransition>
        <div>hello world</div>
      </ScaleTransition>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
