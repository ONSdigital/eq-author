import React from "react";
import { shallow } from "enzyme";
import TextAnswer from "components/Answers/TextAnswer";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("TextAnswer", () => {
  const i = 1;
  let handleChange;
  let component;

  beforeEach(() => {
    handleChange = jest.fn();

    component = shallow(
      <TextAnswer onChange={handleChange} answer={answer} answerIndex={i} />
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
});
