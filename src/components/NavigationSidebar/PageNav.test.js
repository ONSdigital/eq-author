import React from "react";
import { shallow } from "enzyme";
import PageNav, { PageNavItem, LinkText } from "./PageNav";

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
});
