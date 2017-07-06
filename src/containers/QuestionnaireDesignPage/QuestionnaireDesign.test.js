import React from "react";
import QuestionnaireDesign from "./QuestionnaireDesign";
import { shallow } from "enzyme";

const handleUpdate = jest.fn();
let wrapper;

describe("containers/QuestionnaireDesign", () => {
  it("should render form when loaded", () => {
    wrapper = shallow(
      <QuestionnaireDesign
        loading={false}
        questionnaire={{ title: "hello world" }}
        update={handleUpdate}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should store updated values in state", () => {
    const value = { name: "section.title", value: "My Title" };
    wrapper.instance().handleChange(value);
    expect(wrapper.state().section).toEqual({ title: "My Title" });
  });

  it("should save to API on blur event", () => {
    const value = { name: "section.title", value: "My Title" };
    wrapper.instance().handleChange(value);
    wrapper.instance().handleBlur();
    expect(handleUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ section: { title: "My Title" } })
    );
  });

  it("should prevent from submission", () => {
    const preventDefault = jest.fn();
    wrapper.instance().handleSubmit({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
