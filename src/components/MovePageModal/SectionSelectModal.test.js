import React from "react";
import SectionSelectModal from "./SectionSelectModal";
import { shallow } from "enzyme";
import ItemSelect from "./ItemSelect";

describe("MovePageModal/SectionSelectModal", () => {
  const sections = [
    { id: "1", title: "section 1" },
    { id: "2", title: "section 2" }
  ];

  const createWrapper = (props = {}, render = shallow) =>
    render(
      <SectionSelectModal
        isOpen
        onClose={jest.fn()}
        sections={sections}
        selectedSection={sections[0]}
        onChange={jest.fn()}
        {...props}
      />
    );

  it("should render", () => {
    expect(createWrapper()).toMatchSnapshot();
  });

  it("should call on change when section selected", () => {
    const onChange = jest.fn();
    const wrapper = createWrapper({ onChange });

    wrapper.find(ItemSelect).simulate("change");
    expect(onChange).toHaveBeenCalled();
  });
});
