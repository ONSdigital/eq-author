import QuestionPageToolbar from "./QuestionPageToolbar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import React from "react";
import { shallow } from "enzyme";

describe("QuestionPageToolbar", () => {
  let wrapper;

  let mockMutations;
  let page;

  const createWrapper = (props, render = shallow) =>
    render(<QuestionPageToolbar {...props} />);

  const isModalOpen = wrapper =>
    wrapper.find(DeleteConfirmDialog).prop("isOpen");
  const openModal = wrapper =>
    wrapper.find(`[data-test="btn-delete"]`).simulate("click");

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
    wrapper = createWrapper({ page, ...mockMutations }, shallow);

    expect(isModalOpen(wrapper)).toBe(false);
    openModal(wrapper);
    expect(isModalOpen(wrapper)).toBe(true);
  });

  it("allows DeleteConfirmDialog to be closed", () => {
    wrapper = createWrapper({ page, ...mockMutations }, shallow);

    openModal(wrapper);
    wrapper.find(DeleteConfirmDialog).simulate("close");

    expect(isModalOpen(wrapper)).toBe(false);
  });

  it("should delete page after confirmation", () => {
    wrapper = createWrapper({ page, ...mockMutations }, shallow);
    wrapper.find(DeleteConfirmDialog).simulate("deletePage");
    expect(mockMutations.onDeletePage).toHaveBeenCalled();
  });
});
