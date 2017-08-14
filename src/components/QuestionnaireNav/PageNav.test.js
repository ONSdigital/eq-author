import React from "react";
import { shallow } from "enzyme";
import PageNav, { DeleteButton, PageNavItem } from "./PageNav";

describe("PageNav", () => {
  let component, handleDelete;

  const questionnaire = { id: 1, title: "Questionnaire" };
  const page = { id: 2, title: "Page" };
  const section = { id: 3, title: "Section", pages: [page] };

  beforeEach(() => {
    handleDelete = jest.fn(() => Promise.resolve());

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

  describe("PageNavItem", () => {
    let pageNavComponent;

    beforeEach(() => {
      pageNavComponent = component.find(PageNavItem).dive();
    });

    describe("when delete button clicked", () => {
      it("should invoke callback when delete button clicked", () => {
        pageNavComponent.find(DeleteButton).simulate("click");
        expect(handleDelete).toHaveBeenCalledWith(3, 2);
      });

      it("should set isDeleting state to true", () => {
        pageNavComponent.find(DeleteButton).simulate("click");
        expect(pageNavComponent.state().isDeleting).toBe(true);
      });

      it("should set isDeleting state false in event of failure", () => {
        const handleDelete = jest.fn(() => Promise.reject());
        pageNavComponent.setProps({ onDelete: handleDelete });

        return pageNavComponent.instance().handleDelete().then(() => {
          expect(pageNavComponent.state().isDeleting).toBe(false);
        });
      });
    });

    it("should render", () => {
      expect(pageNavComponent).toMatchSnapshot();
    });
  });
});
