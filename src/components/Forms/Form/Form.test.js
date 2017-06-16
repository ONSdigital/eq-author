import React from "react";
import { shallow } from "enzyme";
import { Form } from "components/Forms/Form";

let wrapper;
const handleSubmit = jest.fn();
describe("components/Forms/Form", () => {
  beforeEach(() => {
    wrapper = shallow(
      <Form handleSubmit={handleSubmit}>
        <input name="input" type="text" />
      </Form>
    );
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleSubmit", () => {
    wrapper.simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });
});
