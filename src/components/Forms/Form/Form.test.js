import React from "react";
import { shallow } from "enzyme";
import { Form } from "components/Forms/Form";

let wrapper;
const onSubmit = jest.fn();
describe("components/Forms/Form", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Form onSubmit={onSubmit}>
        <input name="input" type="text" />
      </Form>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call onSubmit", () => {
    wrapper.simulate("submit");
    expect(onSubmit).toHaveBeenCalled();
  });
});
