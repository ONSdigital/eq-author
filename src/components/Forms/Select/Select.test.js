import React from "react";
import { shallow, mount } from "enzyme";
import Select from "./";

const options = ['One', 'Two', 'Three', 'Four', 'Five']

it("renders without crashing", () => {
  shallow(<Select options={options}></Select>);
});

it("renders a select element", () => {
  const app = mount(
    <Select options={options}></Select>
  );

  expect(app.find("select").length).toEqual(1);
});

it("renders options as children of select", () => {
    const app = mount(
    <Select options={options}></Select>
  );

  expect(app.find("select").children().length).toEqual(5);
  app.find("select").children().forEach(e => {
    expect(e.type()).toEqual('option')
  })
});

it("calls onChange when value changed", () => {
  const handleChange = jest.fn()
  const app = mount(
    <Select options={options} onChange={handleChange}></Select>
  )
  app.find('select').simulate('change')

  expect(handleChange).toHaveBeenCalled()
})

it("changes value when option selected", () => {
  const handleChange = jest.fn()
  const event = {target: { value: 'three'}}
  const app = mount(
    <Select options={options} onChange={handleChange}></Select>
  )

  app.find('select').simulate('change', event)

  expect(handleChange).toHaveBeenCalledWith(expect.objectContaining(event))
})
