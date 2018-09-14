import React from "react";
import { shallow } from "enzyme";

import SidebarButton, {
  Detail as SidebarButtonDetail
} from "components/SidebarButton";
import ModalWithNav from "components/ModalWithNav";
import { UnconnectedAnswerValidation } from "components/Validation/AnswerValidation";

const render = (props, render = shallow) => {
  return render(<UnconnectedAnswerValidation {...props} />);
};

describe("AnswerValidation", () => {
  let props;

  beforeEach(() => {
    props = {
      answer: {
        id: "1",
        type: "Number",
        validation: {
          minValue: {
            enabled: false
          },
          maxValue: {
            enabled: false
          }
        }
      },
      gotoTab: jest.fn()
    };
  });

  it("should render", () => {
    expect(render(props)).toMatchSnapshot();
  });

  it("should not render there are no valid validation types", () => {
    props.answer.type = "Radio";
    expect(render(props)).toMatchSnapshot();
  });

  it("should correctly initialise state", () => {
    const wrapper = render(props);
    expect(wrapper.state("modalIsOpen")).toEqual(false);
  });

  it("should correctly update state when opening a modal", () => {
    const wrapper = render(props);
    wrapper
      .find(SidebarButton)
      .first()
      .simulate("click");
    expect(wrapper.state("modalIsOpen")).toEqual(true);
  });

  it("should correctly update state when closing a modal", () => {
    const wrapper = render(props);
    wrapper.find(ModalWithNav).simulate("close");
    expect(wrapper.state("modalIsOpen")).toEqual(false);
  });

  it("should render max/min validation values in the preview", () => {
    const wrapper = render({
      ...props,
      answer: {
        id: "1",
        type: "Number",
        validation: {
          minValue: {
            enabled: true,
            custom: 5
          },
          maxValue: {
            enabled: false
          }
        }
      }
    });
    expect(
      wrapper
        .find(SidebarButtonDetail)
        .at(0)
        .prop("children")
    ).toEqual(5);
  });

  it("should render preview dates as UK format", () => {
    const wrapper = render({
      ...props,
      answer: {
        id: "1",
        type: "Date",
        validation: {
          earliestDate: {
            enabled: true,
            customDate: "2018-09-02"
          },
          latestDate: {
            enabled: false
          }
        }
      }
    });
    expect(
      wrapper
        .find(SidebarButtonDetail)
        .at(0)
        .prop("children")
    ).toEqual("02-09-2018");
  });
});
