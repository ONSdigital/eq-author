import React from "react";
import { shallow, mount } from "enzyme";
import Select from "./";

const options = ["One", "Two", "Three", "Four", "Five"];

describe("Select", () => {
  let select, handleChange;

  beforeEach(() => {
    handleChange = jest.fn();
    select = (
      <Select
        options={options}
        onChange={handleChange}
        value={options[0]}
        name="foo"
        id="bar"
      />
    );
  });

  it("renders without crashing", () => {
    shallow(select);
  });

  it("renders a select element", () => {
    const app = mount(select);

    expect(app.find("select").length).toEqual(1);
  });

  it("renders options as children of select", () => {
    const app = mount(select);

    expect(app.find("select").children().length).toEqual(options.length);
    app.find("select").children().forEach(e => {
      expect(e.type()).toEqual("option");
    });
  });

  it("calls onChange when value changed", () => {
    const app = mount(select);
    app.find("select").simulate("change");

    expect(handleChange).toHaveBeenCalled();
  });

  it("changes value when option selected", () => {
    const app = mount(select);
    const event = { target: { value: "three" } };

    app.find("select").simulate("change", event);

    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining(event));
  });
});
