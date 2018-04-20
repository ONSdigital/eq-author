import React from "react";
import { shallow } from "enzyme";
import PageNavItem from "./PageNavItem";

describe("PageNavItem", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <PageNavItem
        questionnaireId={"1"}
        sectionId={"2"}
        pageId={"3"}
        title="Title"
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
