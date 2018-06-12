import React from "react";
import { shallow } from "enzyme";
import { UnwrappedPageNavItem } from "./PageNavItem";

describe("PageNavItem", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <UnwrappedPageNavItem
        questionnaireId={"1"}
        sectionId={"2"}
        pageId={"3"}
        title="Title"
        match={{
          params: { questionnaireId: "1", sectionId: "2", pageId: "3" }
        }}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
