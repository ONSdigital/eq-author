import DeleteConfirmDialog from "./DeleteConfirmDialog";

import React from "react";
import { shallow } from "enzyme";

describe("Question Page Editor", () => {
  let wrapper;

  let mockMutations;
  let page;

  beforeEach(() => {
    mockMutations = {
      onDeletePage: jest.fn(),
      onClose: jest.fn()
    };

    page = {
      __typename: "Page",
      id: "1",
      title: "",
      description: "",
      guidance: ""
    };

    wrapper = shallow(<DeleteConfirmDialog {...mockMutations} page={page} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call deletePage handler when delete button is clicked", () => {
    const deleteBtn = wrapper.find("[data-test='btn-delete']");
    deleteBtn.simulate("click");
    expect(mockMutations.onDeletePage).toHaveBeenCalled();
  });

  it("should call close handler when cancel button is clicked", () => {
    const cancelBtn = wrapper.find("[data-test='btn-cancel']");
    cancelBtn.simulate("click");
    expect(mockMutations.onClose).toHaveBeenCalled();
  });
});
