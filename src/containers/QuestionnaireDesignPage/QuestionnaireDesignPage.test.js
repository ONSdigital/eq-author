import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import QuestionnaireDesign from "components/QuestionnaireDesign";
import { shallow } from "enzyme";

let handleUpdate, handleSubmit, wrapper, handleSectionUpdate, handlePageUpdate;

let section = { title: "" };
let page = {
  description: "",
  guidance: "",
  title: "",
  type: "General"
};

describe("containers/QuestionnaireDesign", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    handleSectionUpdate = jest.fn();
    handlePageUpdate = jest.fn();

    wrapper = shallow(
      <QuestionnaireDesignPage
        onSubmit={handleSubmit}
        questionnaire={{ title: "hello world", sections: [section] }}
        onUpdate={handleUpdate}
        onSectionUpdate={handleSectionUpdate}
        onPageUpdate={handlePageUpdate}
        section={section}
        page={page}
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

  it("should update Section when section field blurs", () => {
    wrapper
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "section.title",
        value: "My Title"
      })
      .simulate("blur");

    expect(handleSectionUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should update Page when page field blurs", () => {
    wrapper
      .setState({ focused: "page" })
      .find(QuestionnaireDesign)
      .simulate("change", {
        name: "page.title",
        value: "My Title"
      })
      .simulate("blur");

    expect(handlePageUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Title" })
    );
  });

  it("should not update when unknown field blurs", () => {
    wrapper
      .setState({ focused: null })
      .find(QuestionnaireDesign)
      .simulate("blur");

    expect(handlePageUpdate).not.toHaveBeenCalled();
    expect(handleSectionUpdate).not.toHaveBeenCalled();
  });

  it("should set focus state when field receives focus", () => {
    wrapper.find(QuestionnaireDesign).simulate("focus", "page");

    expect(wrapper.state().focused).toBe("page");
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
