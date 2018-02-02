import QuestionPageToolbar from "./QuestionPageToolbar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import React from "react";
import { shallow, mount } from "enzyme";

describe("QuestionPageToolbar", () => {
  let wrapper;

  let mockMutations;
  let page;

  const createWrapper = (props, render = shallow) =>
    render(<QuestionPageToolbar {...props} />);

  const openModal = wrapper =>
    wrapper
      .find("IconButton__StyledButton")
      .first()
      .simulate("click");

  const confirmDelete = wrapper =>
    wrapper
      .find("[data-test='confirm-delete-dialog'] [data-test='btn-delete']")
      .first()
      .simulate("click");

  beforeEach(() => {
    mockMutations = {
      onDeletePage: jest.fn()
    };

    page = {
      __typename: "Page",
      id: "1",
      title: "",
      description: "",
      guidance: ""
    };

    wrapper = createWrapper({ page, ...mockMutations });
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display Modal when delete button is clicked", () => {
    wrapper = createWrapper({ page, ...mockMutations }, mount);

    expect(wrapper.find(DeleteConfirmDialog).prop("isOpen")).toBe(false);
    openModal(wrapper);
    expect(wrapper.find(DeleteConfirmDialog).prop("isOpen")).toBe(true);
  });

  it("should delete page after confirmation", () => {
    wrapper = createWrapper({ page, ...mockMutations }, mount);

    openModal(wrapper);
    confirmDelete(wrapper);

    expect(mockMutations.onDeletePage).toHaveBeenCalled();
  });
});
