import React from "react";
import { mount } from "enzyme";
import Field from "components/Forms/Field";
import { Label, Input } from "components/Forms";

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
    expect(wrapper.find(Input).props().id).toBe("name");
    expect(wrapper.find(Label).props().id).toBe("name");
  });
});
