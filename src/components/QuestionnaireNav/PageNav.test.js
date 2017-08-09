import React from "react";
import { shallow } from "enzyme";
import PageNav, { DeleteButton } from "./PageNav";

describe("PageNav", () => {
  let component, handleDelete;

  const questionnaire = { id: 1, title: "Questionnaire" };
  const page = { id: 2, title: "Page" };
  const section = { id: 3, title: "Section", pages: [page] };

  beforeEach(() => {
    handleDelete = jest.fn();

    component = shallow(
      <PageNav
        questionnaire={questionnaire}
        section={section}
        onDelete={handleDelete}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should invoke callback when delete button clicked", () => {
    component.find(DeleteButton).simulate("click");
    expect(handleDelete).toHaveBeenCalledWith(3, 2);
  });
});
