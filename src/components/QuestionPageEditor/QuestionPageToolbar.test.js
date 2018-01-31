import QuestionPageToolbar from "./QuestionPageToolbar";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import React from "react";
import { shallow } from "enzyme";

describe("Question Page Editor", () => {
  let wrapper;

  let mockMutations;
  let page;

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

    wrapper = shallow(<QuestionPageToolbar {...mockMutations} page={page} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should display Modal when delete button is clicked", () => {
    const deleteBtn = wrapper.find("[data-test='btn-delete']");
    const deleteConfirmDialog = wrapper.find(DeleteConfirmDialog);
    deleteBtn.simulate("click");
    expect(deleteConfirmDialog.props().isOpen).toBe(false);
  });

  it("should offload closing of Modal to the Dialog itself", () => {
    const deleteConfirmDialog = wrapper.find(DeleteConfirmDialog);
    deleteConfirmDialog.simulate("close");
    expect(deleteConfirmDialog.props().isOpen).toBe(false);
  });

  it("should offload deleting of page to Dialog", () => {
    const deleteConfirmDialog = wrapper.find(DeleteConfirmDialog);
    deleteConfirmDialog.simulate("deletePage");
    expect(mockMutations.onDeletePage).toHaveBeenCalled();
  });
});
