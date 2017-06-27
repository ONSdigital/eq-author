import React from "react";
import { mountWithRouter } from "tests/utils/mountWithRouter";
import QuestionnaireMeta from "./QuestionnaireMeta";

let wrapper;

const onUpdate = jest.fn();

const questionnaire = {
  title: "My Questionnaire",
  description: "",
  legalBasis: "",
  navigation: true,
  theme: "default"
};

describe("containers/QuestionnaireMeta", () => {
  beforeEach(() => {
    wrapper = mountWithRouter(
      <QuestionnaireMeta
        onUpdate={onUpdate}
        loading={false}
        questionnaire={questionnaire}
      />
    );
  });

  it("should update state with questionnaire data when received as props", () => {
    wrapper.setProps({ questionnaire });
    expect(wrapper.state()).toMatchObject(questionnaire);
  });

  it("should store updated values in state", () => {
    const value = { title: "My Title" };
    wrapper.instance().onChange(value);
    expect(wrapper.state()).toMatchObject(value);
  });

  it("should save to API on blur event", () => {
    const value = { title: "My Title" };
    wrapper.instance().onChange(value);
    wrapper.instance().onBlur();
    expect(onUpdate).toHaveBeenCalledWith(value);
  });

  it("should prevent from submission", () => {
    const preventDefault = jest.fn();
    wrapper.instance().onSubmit({ preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
