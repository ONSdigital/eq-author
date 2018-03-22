import React from "react";
import PositionSelectModal from "./PositionSelectModal";
import { shallow } from "enzyme";
import ItemSelect from "./ItemSelect";

describe("MovePageModal/PositionSelectModal", () => {
  const pages = [{ id: "1", title: "page 1" }, { id: "2", title: "page 2" }];

  const createWrapper = (props = {}, render = shallow) =>
    render(
      <PositionSelectModal
        isOpen
        onClose={jest.fn()}
        pages={pages}
        selectedPosition={0}
        onChange={jest.fn()}
        onConfirm={jest.fn()}
        {...props}
      />
    );

  it("should render", () => {
    expect(createWrapper()).toMatchSnapshot();
  });

  it("should call onChange when pages position is selected", () => {
    const onChange = jest.fn();
    const wrapper = createWrapper({ onChange });

    wrapper.find(ItemSelect).simulate("change");
    expect(onChange).toHaveBeenCalled();
  });

  it("should call onConfirm when submit button is clicked", () => {
    const onConfirm = jest.fn();
    const wrapper = createWrapper({ onConfirm });

    wrapper.find(`form`).simulate("submit");
    expect(onConfirm).toHaveBeenCalled();
  });

  it("should close the modal when cancel button is clicked", () => {
    const onClose = jest.fn();
    const wrapper = createWrapper({ onClose });

    wrapper.find(`[type="button"]`).simulate("click");
    expect(onClose).toHaveBeenCalled();
  });
});
