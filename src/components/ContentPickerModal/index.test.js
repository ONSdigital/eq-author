import { shallow } from "enzyme";
import React from "react";
import BaseTabs from "components/BaseTabs";
import ContentPickerModal, { StyledCloseButton } from "./";
import {
  AnswerContentPicker,
  MetadataContentPicker
} from "components/ContentPicker";

describe("ContentPickerModal", () => {
  let props;

  beforeEach(() => {
    props = {
      metadataData: [{ id: "1", alias: "Some metadata" }],
      answerData: [{ id: "1", displayName: "Some section" }],
      onSubmit: jest.fn(),
      onClose: jest.fn()
    };
  });

  it("should render", () => {
    const wrapper = shallow(<ContentPickerModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onClose when the close button is pressed", () => {
    const wrapper = shallow(<ContentPickerModal {...props} />);
    const TabList = wrapper.find(BaseTabs).prop("TabList");
    const TabListWrapper = shallow(<TabList>helo</TabList>);
    TabListWrapper.find(StyledCloseButton).simulate("click");
    expect(props.onClose).toHaveBeenCalled();
  });

  it("should change the activeId to the value passed in the onChange", () => {
    const wrapper = shallow(<ContentPickerModal {...props} />);
    wrapper.find(BaseTabs).simulate("change", "metadata");
    expect(wrapper.find(BaseTabs).prop("activeId")).toEqual("metadata");
  });

  it("should default the active id to metadata if there are no answers", () => {
    const wrapper = shallow(<ContentPickerModal {...props} answerData={[]} />);
    expect(wrapper.find(BaseTabs).prop("activeId")).toEqual("metadata");
  });

  it("should submit with an answer when the user picks an answer", () => {
    const wrapper = shallow(<ContentPickerModal {...props} />);
    const tabs = wrapper.find(BaseTabs).prop("tabs");
    const AnswerTab = tabs[0].render;
    const answerTabWrapper = shallow(<AnswerTab />);
    answerTabWrapper
      .find(AnswerContentPicker)
      .simulate("submit", { id: "1", displayName: "Foo", type: "text" });
    expect(props.onSubmit).toHaveBeenCalledWith({
      id: "1",
      displayName: "Foo",
      type: "text",
      pipingType: "answers"
    });
  });

  it("should show an error message when there are no answers to pick from", () => {
    const wrapper = shallow(<ContentPickerModal {...props} answerData={[]} />);
    const tabs = wrapper.find(BaseTabs).prop("tabs");
    const MetadataTab = tabs[0].render;
    const metadataTabWrapper = shallow(<MetadataTab />);
    expect(metadataTabWrapper).toMatchSnapshot();
  });

  it("should submit with a metadata when the user picks a metadata", () => {
    const wrapper = shallow(<ContentPickerModal {...props} />);
    const tabs = wrapper.find(BaseTabs).prop("tabs");
    const MetadataTab = tabs[1].render;
    const metadataTabWrapper = shallow(<MetadataTab />);
    metadataTabWrapper
      .find(MetadataContentPicker)
      .simulate("submit", { id: "2", displayName: "Metadata" });
    expect(props.onSubmit).toHaveBeenCalledWith({
      id: "2",
      displayName: "Metadata",
      pipingType: "metadata"
    });
  });

  it("should show an error message when there is no metadata", () => {
    const wrapper = shallow(
      <ContentPickerModal {...props} metadataData={[]} />
    );
    const tabs = wrapper.find(BaseTabs).prop("tabs");
    const MetadataTab = tabs[1].render;
    const metadataTabWrapper = shallow(<MetadataTab />);
    expect(metadataTabWrapper).toMatchSnapshot();
  });
});
