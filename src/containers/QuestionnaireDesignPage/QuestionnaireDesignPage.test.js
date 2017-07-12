import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import QuestionnaireDesign from "components/QuestionnaireDesign";
import { shallow } from "enzyme";

let handleUpdate;
let handleSubmit;

let wrapper;

let section = { title: "" };

describe("containers/QuestionnaireDesign", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    wrapper = shallow(
      <QuestionnaireDesignPage
        onSubmit={handleSubmit}
        loading={false}
        questionnaire={{ title: "hello world", sections: [section] }}
        onUpdate={handleUpdate}
        section={section}
      />
    );
  });

  it("should render form when loaded", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should store updated values in state", () => {
    wrapper.find(QuestionnaireDesign).simulate("change", {
      name: "section.title",
      value: "My Title"
    });
    expect(wrapper.state().section).toEqual(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should save to API on blur event", () => {
    wrapper
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "section.title",
        value: "My Title"
      })
      .simulate("blur");

    expect(handleUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ section: { title: "My Title" } })
    );
  });

  it("should set focused element on blur", () => {
    wrapper.simulate("blur");
    expect(wrapper.state().focused).toEqual("section");
  });

  it("should set focused element on focus", () => {
    wrapper.simulate("focus");
    expect(wrapper.state().focused).toEqual("section");
  });
});
