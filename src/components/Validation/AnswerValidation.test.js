import React from "react";
import { shallow } from "enzyme";

import SidebarButton from "components/SidebarButton";
import ModalWithNav from "components/ModalWithNav";
import { UnconnectedAnswerValidation } from "components/Validation/AnswerValidation";

describe("AnswerValidation", () => {
  let wrapper, props;

  const render = (props = {}) =>
    shallow(<UnconnectedAnswerValidation {...props} />);

  beforeEach(() => {
    props = {
      answer: {
        id: "1",
        type: "Number"
      },
      gotoTab: jest.fn()
    };

    wrapper = render(props);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should correctly initialise state", () => {
    expect(wrapper.state("modalIsOpen")).toEqual(false);
  });

  it("should correctly update state when opening a modal", () => {
    wrapper.find(SidebarButton).simulate("click");
    expect(wrapper.state("modalIsOpen")).toEqual(true);
  });

  it("should correctly update state when closing a modal", () => {
    wrapper.find(ModalWithNav).simulate("click");
    expect(wrapper.state("modalIsOpen")).toEqual(false);
  });
});
