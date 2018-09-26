import React from "react";
import { shallow } from "enzyme";

import ContentPickerModal from "components/ContentPickerModal";

const createWrapper = (props = {}) =>
  shallow(<ContentPickerModal {...props} />);

describe("components/ContentPickerModal", () => {
  let props, wrapper;

  props = {
    data: [
      {
        id: "1"
      }
    ],
    onSubmit: jest.fn(),
    isOpen: true,
    onClose: jest.fn()
  };

  wrapper = createWrapper(props);

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
