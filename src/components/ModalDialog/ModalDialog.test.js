import React from "react";
import { shallow } from "enzyme";
import ModalDialog from "components/ModalDialog";

const createWrapper = (props, render = shallow) => {
  return render(
    <ModalDialog onClose={jest.fn()} isOpen={false} {...props}>
      <div>Modal dialog content</div>
    </ModalDialog>
  );
};

describe("ModalDialog", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it("should render when closed", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render when open", () => {
    wrapper = createWrapper({
      isOpen: true
    });

    expect(wrapper).toMatchSnapshot();
  });
});
