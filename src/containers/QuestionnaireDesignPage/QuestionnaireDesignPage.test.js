import React from "react";
import { QuestionnaireDesignPage } from "./QuestionnaireDesignPage";
import QuestionnaireDesign from "components/QuestionnaireDesign";
import { shallow } from "enzyme";

let handleUpdate,
  handleSubmit,
  wrapper,
  handleSectionUpdate,
  handlePageUpdate,
  handleAddPage,
  handleAddSection;

let page = {
  id: "1",
  description: "",
  guidance: "",
  title: "",
  type: "General"
};

let section = { id: "2", title: "", pages: [page] };

let questionnaire = { id: "3", title: "hello world", sections: [section] };

describe("containers/QuestionnaireDesign", () => {
  beforeEach(() => {
    handleUpdate = jest.fn();
    handleSubmit = jest.fn();
    handleAddPage = jest.fn();
    handleSectionUpdate = jest.fn();
    handlePageUpdate = jest.fn();
    handleAddSection = jest.fn();

    wrapper = shallow(
      <QuestionnaireDesignPage
        onSubmit={handleSubmit}
        questionnaire={questionnaire}
        onUpdate={handleUpdate}
        onSectionUpdate={handleSectionUpdate}
        onPageUpdate={handlePageUpdate}
        onAddPage={handleAddPage}
        onAddSection={handleAddSection}
        section={section}
        page={page}
        loading={false}
      />
    );
  });

  it("should render nothing when loading", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render form when loaded", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should update state with when receiving props", () => {
    const section = { id: 4, title: "Section 2" };
    const page = { id: 5, title: "Page 2", type: "General" };
    wrapper.setProps({ section, page });

    expect(wrapper.state().section).toBe(section);
    expect(wrapper.state().page).toBe(page);
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

  it("should alert when answer added", () => {
    global.alert = jest.fn();

    wrapper
      .setState({ focused: null })
      .find(QuestionnaireDesign)
      .simulate("answerAdd");

    expect(global.alert).toHaveBeenCalled();
  });
});
