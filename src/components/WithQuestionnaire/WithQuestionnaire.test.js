import React from "react";

import withQuestionnaire from "components/WithQuestionnaire";
import { shallow } from "enzyme";

let wrapper;

let handleUpdate;

let WrappedComponent;

describe("components/WithQuestionnaire", () => {
  const Child = props => <div {...props} />;
  Child.displayName = "Child";

  beforeEach(() => {
    handleUpdate = jest.fn();

    WrappedComponent = withQuestionnaire(Child);

    wrapper = shallow(
      <WrappedComponent update={handleUpdate} loading={false} />
    );
  });

  it("should not render when loading", () => {
    wrapper.setProps({ loading: true });
    expect(wrapper).toMatchSnapshot();
  });

  it("should store questionnaire props as state", () => {
    const questionnaire = {
      title: "My Title"
    };
    wrapper.setProps({ questionnaire });
    expect(wrapper.state().questionnaire).toEqual(questionnaire);
  });

  it("should set the displayName", () => {
    expect(WrappedComponent.displayName).toEqual("WithQuestionnaire(Child)");
  });

  it("should catch and prevent form submit events", () => {
    const preventDefault = jest.fn();
    wrapper.simulate("submit", { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });

  it("should store updated values in state", () => {
    const value = { name: "questionnaire.title", value: "My Title" };
    wrapper.instance().handleChange(value);
    expect(wrapper.state().questionnaire).toEqual({ title: "My Title" });
  });

  it("should save to API on blur event", () => {
    const value = { name: "questionnaire.title", value: "My Title" };
    wrapper.instance().handleChange(value);
    wrapper.instance().handleBlur();
    expect(handleUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ questionnaire: { title: "My Title" } })
    );
  });
});
