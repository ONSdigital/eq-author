import React from "react";
import { shallow } from "enzyme";
import Dialog from "components/Dialog";
import {
  Header,
  Message,
  Heading,
  Subheading,
  Icon,
  Description
} from "components/Dialog/Header";

const children = (
  <Header>
    <Message>
      <Heading>Dialog title</Heading>
      <Subheading>Dialog subheading</Subheading>
      <Description>Dialog description</Description>
    </Message>
    <Icon icon="move" />
  </Header>
);

const createWrapper = (props = {}, render = shallow) => {
  return render(<Dialog {...props} />);
};

describe("components/Dialog", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      onClose: jest.fn(),
      primaryAction: jest.fn(),
      primaryActionText: "Primary action",
      children
    };

    wrapper = createWrapper(props);
  });

  it("should render a dialog", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render children", () => {
    const wrapper = createWrapper({
      ...props,
      children: <p>This is the modal dialog content</p>
    });
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle close when close button is clicked", () => {
    wrapper.find("Dialog__CloseButton").simulate("click");
    expect(props.onClose).toHaveBeenCalled();
  });

  describe("Dialog actions", () => {
    let actions;

    beforeEach(() => {
      actions = {
        secondaryAction: jest.fn(),
        secondaryActionText: "Secondary Action",
        tertiaryAction: jest.fn(),
        tertiaryActionText: "Tertiary Action"
      };

      wrapper = createWrapper({ ...props, ...actions }, shallow);
    });

    it("should render multiple actions", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should execute primary action", () => {
      wrapper.find("Dialog__Action[primary=true]").simulate("click");
      expect(props.primaryAction).toHaveBeenCalled();
    });

    it("should execute secondary action", () => {
      wrapper.find("Dialog__Action[secondary=true]").simulate("click");
      expect(actions.secondaryAction).toHaveBeenCalled();
    });

    it("should execute tertiary action", () => {
      wrapper.find("Dialog__Action[tertiary=true]").simulate("click");
      expect(actions.tertiaryAction).toHaveBeenCalled();
    });
  });
});
