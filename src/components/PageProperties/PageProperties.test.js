import React from "react";
import Form from "components/Forms/Form";
import { Select, Number } from "components/Forms";
import PageProperties from "components/PageProperties";
import { shallow } from "enzyme";

let wrapper;

let handleUpdate;
let handleSubmit;
let handleChange;
let handleBlur;

let pageProperties;

const page = {
  type: "Question",
  title: "page-title",
  description: "page-description"
};

describe("Page Properties", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    handleChange = jest.fn();
    handleBlur = jest.fn();

    pageProperties = () =>
      <PageProperties
        page={page}
        loading={false}
        orderMax={10}
        onUpdate={handleUpdate}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onBlur={handleBlur}
      />;

    wrapper = shallow(pageProperties());
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should handle submit event", () => {
    wrapper.find(Form).simulate("submit");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should invoke onChange callback on change", () => {
    wrapper.find(Select).simulate("change");
    wrapper.find(Number).simulate("change");
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("should handle onBlur callback on blur", () => {
    wrapper.find(Select).simulate("blur");
    wrapper.find(Number).simulate("blur");
    expect(handleBlur).toHaveBeenCalledTimes(2);
  });
});
