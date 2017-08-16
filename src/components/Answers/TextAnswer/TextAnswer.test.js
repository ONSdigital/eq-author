import React from "react";
import { shallow } from "enzyme";
import TextAnswer from "./TextAnswer";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

const i = 1;

const handleChange = jest.fn();

describe("TextAnswer", () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <TextAnswer onChange={handleChange} answer={answer} index={i} />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
