import React from "react";
import { shallow } from "enzyme";
import { StatelessCurrencyAnswer } from "components/Answers/CurrencyAnswer";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("CurrencyAnswer", () => {
  let handleChange;
  let handleUpdate;
  let component;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();

    component = shallow(
      <StatelessCurrencyAnswer
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
      />
    );
  });

  it("should render", () => {
    expect(component).toMatchSnapshot();
  });

  it("should invoke callback on change", () => {
    component.find(SeamlessTextArea).simulate("change");
    component.find(SeamlessInput).simulate("change");

    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("should invoke update callback on blur", () => {
    component.find(SeamlessTextArea).simulate("blur");
    component.find(SeamlessInput).simulate("blur");

    expect(handleUpdate).toHaveBeenCalledTimes(2);
  });
});
