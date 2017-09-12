import React from "react";
import Form from "components/Forms/Form";

import PageProperties from "components/PageProperties";
import { shallow, mount } from "enzyme";

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

  describe("behaviour", () => {
    beforeEach(() => {
      wrapper = mount(pageProperties());
    });

    it("should handle submit event", () => {
      wrapper.find(Form).simulate("submit");
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle change event for select", () => {
      wrapper.find("select").simulate("change");
      expect(handleChange).toHaveBeenCalled();
    });

    it("should handle blur event for any inputs", () => {
      wrapper.find("input").simulate("blur");
      expect(handleBlur).toHaveBeenCalled();
    });
  });
});
