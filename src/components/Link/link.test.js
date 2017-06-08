import React from "react";
import Link from "components/Link";
import { mount } from "enzyme";

describe("link component", () => {
  let link, handleClick;
  const DATA_PROP = "some data value";
  const TEXT_PROP = "some text value";

  beforeEach(() => {
    handleClick = jest.fn();
    link = mount(
      <Link onClick={handleClick} data={DATA_PROP} text={TEXT_PROP} />
    );
  });

  it("should map the data onto the name", () => {
    expect(link.find("a").prop("name")).toEqual(DATA_PROP);
  });

  it("should test if the onClick handler is called", () => {
    link.find("a").simulate("click");
    expect(handleClick).toHaveBeenCalled();
  });

  it("test text prop is rendered as a child", () => {
    expect(link.find("a").text()).toEqual(TEXT_PROP);
  });
});