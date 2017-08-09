import React from "react";
import { shallow } from "enzyme";
import TextAnswer from "./TextAnswer";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

const handleChange = jest.fn();

describe("TextAnswer", () => {
  let component;

  beforeEach(() => {
    component = shallow(<TextAnswer onChange={handleChange} answer={answer} />);
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });
});
