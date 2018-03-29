import EntityToolbar from "components/EntityToolbar";

import React from "react";
import { shallow } from "enzyme";

describe("EntityToolbar", () => {
  let wrapper;

  let mockMutations;
  let page;

  beforeEach(() => {
    mockMutations = {
      onDelete: jest.fn()
    };

    page = {
      __typename: "Page",
      id: "1",
      title: "",
      description: "",
      guidance: ""
    };

    wrapper = shallow(<EntityToolbar {...mockMutations} entity={page} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onDelete handler when delete button is clicked", () => {
    const deleteBtn = wrapper.find("[data-test='btn-delete']");

    deleteBtn.simulate("click");
    expect(mockMutations.onDelete).toHaveBeenCalled();
  });
});
