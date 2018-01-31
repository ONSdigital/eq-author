import React from "react";
import { shallow } from "enzyme";
import PageNav, {
  DeleteButton,
  PageNavItem,
  LinkText,
  StyledPageItem
} from "./PageNav";

describe("PageNav", () => {
  let component, handleDelete;

  const questionnaire = { id: "1", title: "Questionnaire" };
  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page], number: 1 };

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

    it("should render", () => {
      expect(pageNavComponent).toMatchSnapshot();
    });

    describe("when delete button clicked", () => {
      it("should invoke callback when delete button clicked", () => {
        pageNavComponent.find(DeleteButton).simulate("click");
        expect(handleDelete).toHaveBeenCalledWith("3", "2");
      });

      it("should set isDeleting state to true", () => {
        pageNavComponent.find(DeleteButton).simulate("click");
        expect(pageNavComponent.state().isDeleting).toBe(true);
      });

      it("should set isDeleting state false in event of failure", () => {
        const handleCatch = jest.fn(arg => arg());
        const handleDelete = () => ({ catch: handleCatch });

        pageNavComponent.setProps({ onDelete: handleDelete });
        pageNavComponent.find(DeleteButton).simulate("click");

        expect(handleCatch).toHaveBeenCalled();
        expect(pageNavComponent.state().isDeleting).toBe(false);
      });
    });
  });

  describe("LinkText", () => {
    it("should be opaque", () => {
      const wrapper = shallow(<LinkText />);
      expect(wrapper).toHaveStyleRule("opacity", "1");
    });

    it("should be partially transparent if fade prop passed", () => {
      const wrapper = shallow(<LinkText fade />);
      expect(wrapper).toHaveStyleRule("opacity", "0.5");
    });
  });

  describe("StyledPageItem", () => {
    it("should have configurable z-index", () => {
      const wrapper = shallow(<StyledPageItem index={123} />);
      expect(wrapper).toHaveStyleRule("z-index", "123");
    });
  });

  describe("Fix keyboard focus scrolling", () => {
    let querySelector;
    let wrapper;
    let props;
    let mockScrollPane;

    beforeEach(() => {
      querySelector = jest.spyOn(document, "querySelector");

      props = {
        sectionId: section.id,
        questionnaireId: questionnaire.id,
        pageId: page.id,
        pageNumber: page.id,
        title: "Title",
        onDelete: handleDelete,
        index: 0
      };

      mockScrollPane = document.createElement("div");

      wrapper = shallow(<PageNavItem {...props} />);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should set the scrollLeft to 0", () => {
      querySelector.mockReturnValue(mockScrollPane);
      wrapper.find(DeleteButton).simulate("focus");
      expect(querySelector).toHaveBeenCalledWith(
        '[class*="NavigationScrollPane"]'
      );
      expect(mockScrollPane.scrollLeft).toEqual(0);
    });
  });
});
