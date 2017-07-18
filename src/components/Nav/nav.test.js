import React from "react";
import { shallow } from "enzyme";
import Nav from "components/Nav";

let wrapper;

describe("components/Nav", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Nav
        questionnaire={{
          id: 1,
          title: "Questionnaire",
          sections: [
            {
              id: 2,
              title: "Section 1",
              pages: [{ id: 3 }]
            }
          ]
        }}
      />
    );
  });

  it("should render Nav", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should contain links", () => {
    expect(wrapper.find("a")).toBeTruthy();
  });
});
