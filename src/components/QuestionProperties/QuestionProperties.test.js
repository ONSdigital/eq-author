import React from "react";
import Form from "components/Forms/Form";
import Select from "components/Forms/Select";

import QuestionProperties from "components/QuestionProperties";
import { shallow } from "enzyme";

let wrapper;

const handleUpdate = jest.fn();
const handleSubmit = jest.fn();
const handleChange = jest.fn();
const handleBlur = jest.fn();

describe("QuestionProperties", () => {
  beforeEach(() => {
    wrapper = shallow(
      <QuestionProperties
        onUpdate={handleUpdate}
        loading={false}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle submit event", () => {
    wrapper.find(Form).simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should handle change event", () => {
    wrapper.find(Select).simulate("change");
    expect(handleChange).toHaveBeenCalled();
  });

  it("should handle blur event", () => {
    wrapper.find(Select).simulate("blur");
    expect(handleBlur).toHaveBeenCalled();
  });
});
