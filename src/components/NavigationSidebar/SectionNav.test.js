import React from "react";
import { shallow } from "enzyme";
import SectionNav from "./SectionNav";

describe("SectionNav", () => {
  let wrapper;
  let handleAddPage;

  const page = { id: "2", title: "Page" };
  const section = { id: "3", title: "Section", pages: [page] };
  const questionnaire = {
    id: "1",
    title: "Questionnaire",
    sections: [section]
  };

  beforeEach(() => {
    handleAddPage = jest.fn();

    wrapper = shallow(
      <SectionNav questionnaire={questionnaire} onAddPage={handleAddPage} />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
