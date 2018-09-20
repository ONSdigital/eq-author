import React from "react";
import { shallow } from "enzyme";

import ContentPickerSingle, { PickerWrapper } from "./ContentPickerSingle";

describe("Content Picker Single", () => {
  let props;
  beforeEach(() => {
    props = {
      onTitleClick: jest.fn(),
      onOptionClick: jest.fn(),
      data: [
        { plaintextTitle: "Option 1", id: "1" },
        { label: "Option Label 2", id: "2" },
        { id: "3" }
      ],
      selectedOption: "1",
      title: "Title",
      selected: false,
      open: false,
      hidden: false,
      disabled: false
    };
  });

  it("should render", () => {
    const wrapper = shallow(<ContentPickerSingle {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render when hidden", () => {
    const wrapper = shallow(<ContentPickerSingle {...props} hidden />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onTitleClick with id when title clicked", () => {
    const wrapper = shallow(<ContentPickerSingle {...props} />);
    wrapper.find("[data-test='picker-title']").simulate("click");
    expect(props.onTitleClick).toHaveBeenCalledWith();
  });

  it("should call onOptionClick with id and option when option is clicked", () => {
    const wrapper = shallow(<ContentPickerSingle {...props} />);
    wrapper
      .find("PickerOption")
      .at(1)
      .simulate("click");
    expect(props.onOptionClick).toHaveBeenCalledWith({
      label: "Option Label 2",
      id: "2"
    });
  });

  describe("PickerWrapper", () => {
    it("should render", () => {
      const wrapper = shallow(<PickerWrapper />);
      expect(wrapper).toMatchSnapshot();
    });
    it("should render with additional styles when open", () => {
      const wrapper = shallow(<PickerWrapper open />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
