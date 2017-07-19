import React from "react";
import { shallow, mount } from "enzyme";
import Popout from "./";

let component, handleToggleOpen, trigger;

describe("components/Popout", () => {
  beforeEach(() => {
    trigger = <button>Click Me</button>;
    handleToggleOpen = jest.fn();

    component = (
      <Popout trigger={trigger} open onToggleOpen={handleToggleOpen}>
        <h1>hello world</h1>
      </Popout>
    );
  });

  it("shouldn't render content when open is `false`", () => {
    component = React.cloneElement(component, { open: false });
    expect(shallow(component)).toMatchSnapshot();
  });

  it("should render content when open is `true`", () => {
    expect(component).toMatchSnapshot();
  });

  it("should open when trigger clicked", () => {
    shallow(component).find("button").simulate("click");
    expect(handleToggleOpen).toHaveBeenCalledWith(true);
  });

  describe("event handlers", () => {
    let mounted;

    beforeEach(() => {
      mounted = mount(component, {
        attachTo: document.body.appendChild(document.createElement("div"))
      });
    });

    it("should close when ESC key pressed", () => {
      document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 27 }));
      expect(handleToggleOpen).toHaveBeenCalledWith(false);
    });

    it("should close when clicking outside", () => {
      document.dispatchEvent(new MouseEvent("click"));
      expect(handleToggleOpen).toHaveBeenCalledWith(false);
    });

    it("should not close when clicking inside", () => {
      document.querySelector("h1").dispatchEvent(new MouseEvent("click"));
      expect(handleToggleOpen).not.toHaveBeenCalled();
    });

    it("should clean up event handlers when unmounted", () => {
      mounted.unmount();

      document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 27 }));
      document.dispatchEvent(new MouseEvent("click"));

      expect(handleToggleOpen).not.toHaveBeenCalled();
    });
  });
});
