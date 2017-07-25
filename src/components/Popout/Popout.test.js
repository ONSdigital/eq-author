import React from "react";
import { shallow, mount } from "enzyme";
import Popout from "./";

let component, handleToggleOpen, trigger;

describe("components/Popout", () => {
  beforeEach(() => {
    trigger = <button>Click Me</button>;
    handleToggleOpen = jest.fn();

    const Content = () => <h1>hello world</h1>;

    component = (
      <Popout trigger={trigger} open onToggleOpen={handleToggleOpen}>
        <Content />
      </Popout>
    );
  });

  it("shouldn't render content when closed", () => {
    component = React.cloneElement(component, { open: false });
    expect(shallow(component)).toMatchSnapshot();
  });

  it("should render content when open", () => {
    expect(shallow(component)).toMatchSnapshot();
  });

  describe("event handlers", () => {
    let mounted;

    beforeEach(() => {
      mounted = mount(component, {
        attachTo: document.body.appendChild(document.createElement("div"))
      });
    });

    describe("when open", () => {
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
    });

    describe("when closed", () => {
      beforeEach(() => {
        mounted.setProps({ open: false });
      });

      it("should open when trigger clicked", () => {
        mounted.find("button").simulate("click");
        expect(handleToggleOpen).toHaveBeenCalledWith(true);
      });

      it("should not listen for ESC key presses", () => {
        document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 27 }));
        expect(handleToggleOpen).not.toHaveBeenCalled();
      });

      it("should close listen for clicks outside", () => {
        document.dispatchEvent(new MouseEvent("click"));
        expect(handleToggleOpen).not.toHaveBeenCalled();
      });
    });

    describe("when unmounted", () => {
      it("should clean up event handlers", () => {
        mounted.unmount();

        document.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 27 }));
        document.dispatchEvent(new MouseEvent("click"));

        expect(handleToggleOpen).not.toHaveBeenCalled();
      });
    });
  });
});
