import React from "react";
import { mount } from "enzyme";
import { Field, Label, Input } from "components/Forms";

let wrapper;

describe("components/Forms/Field", () => {
  beforeEach(() => {
    wrapper = mount(
      <Field id="name">
        <Label>Name</Label>
        <Input />
      </Field>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should pass on `id` prop to children", () => {
    wrapper.children().forEach(node => {
      expect(node.prop("id")).toEqual("name");
    });
  });
});
