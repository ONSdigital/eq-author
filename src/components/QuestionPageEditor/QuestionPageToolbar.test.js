import { UnwrappedQuestionPageToolbar } from "./QuestionPageToolbar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import React from "react";
import { shallow } from "enzyme";

describe("QuestionPageToolbar", () => {
  const createWrapper = (props = {}) =>
    shallow(
      <UnwrappedQuestionPageToolbar
        onDeletePage={jest.fn()}
        onModalClose={jest.fn()}
        onModalOpen={jest.fn()}
        isModalOpen={false}
        page={{
          __typename: "Page",
          id: "1",
          title: "",
          description: "",
          guidance: ""
        }}
        {...props}
      />
    );

  it("should render", () => {
    const wrapper = createWrapper();
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke onModalOpen prop when delete button is clicked", () => {
    const onModalOpen = jest.fn();
    const wrapper = createWrapper({ onModalOpen });

    wrapper.find(`[data-test="btn-delete"]`).simulate("click");

    expect(onModalOpen).toHaveBeenCalled();
  });

  it("should invoke onModalClose when Dialog closed", () => {
    const onModalClose = jest.fn();
    const wrapper = createWrapper({ onModalClose });

    wrapper.find(DeleteConfirmDialog).simulate("close");

    expect(onModalClose).toHaveBeenCalled();
  });

  it("should delete page after confirmation", () => {
    const onDeletePage = jest.fn();
    const wrapper = createWrapper({ onDeletePage });

    wrapper.find(DeleteConfirmDialog).simulate("deletePage");

    expect(onDeletePage).toHaveBeenCalled();
  });
});
