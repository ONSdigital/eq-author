import React from "react";
import { shallow } from "enzyme";
import PageNav from "./PageNav";

describe("PageNav", () => {
  let component;

  const questionnaire = { id: "1", title: "Questionnaire" };
  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };

  beforeEach(() => {
    component = shallow(
      <PageNav questionnaire={questionnaire} section={section} />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
