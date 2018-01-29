import React from "react";
import { mount } from "enzyme";
import ModalTrigger from "./index";

describe("ModalTrigger", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ModalTrigger>
        {({ isOpen, onClose, onOpen }) => (
          <React.Fragment>
            <button id="open" onClick={onOpen}>
              Open
            </button>
            <button id="close" onClick={onClose}>
              Close
            </button>
            <input type="checkbox" checked={isOpen} />
          </React.Fragment>
        )}
      </ModalTrigger>
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should initially be closed", () => {
    expect(wrapper.find("input").prop("checked")).toBe(false);
  });

  it("should allow modal to be opened", () => {
    wrapper.find("#open").simulate("click");
    expect(wrapper.find("input").prop("checked")).toBe(true);
  });

  it("should allow for modal to be closed", () => {
    wrapper.find("#open").simulate("click");
    expect(wrapper.find("input").prop("checked")).toBe(true);

    wrapper.find("#close").simulate("click");
    expect(wrapper.find("input").prop("checked")).toBe(false);
  });
});
