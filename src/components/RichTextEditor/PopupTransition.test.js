import React from "react";
import { mount } from "enzyme";
import PopupTransition from "./PopupTransition";

describe("components/Popout/PopupTransition", () => {
  let component;

  beforeEach(() => {
    component = mount(
      <PopupTransition duration={200} arbitraryProp="foo">
        <div>hello world</div>
      </PopupTransition>
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
