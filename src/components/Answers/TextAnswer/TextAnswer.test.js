import React from "react";
import { shallow } from "enzyme";
import { StatelessTextAnswer } from "components/Answers/TextAnswer";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";

const answer = {
  title: "Lorem ipsum",
  description: "Nullam id dolor id nibh ultricies."
};

describe("TextAnswer", () => {
  let handleChange;
  let handleUpdate;
  let wrapper;

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    wrapper = shallow(
      <StatelessTextAnswer
        onChange={handleChange}
        onUpdate={handleUpdate}
        answer={answer}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke update callback onBlur", () => {
    wrapper.find(SeamlessInput).simulate("blur");
    wrapper.find(SeamlessTextArea).simulate("blur");

    expect(handleUpdate).toHaveBeenCalledTimes(2);
  });

  it("should invoke change callback onChange", () => {
    wrapper.find(SeamlessInput).simulate("change");
    wrapper.find(SeamlessTextArea).simulate("change");

    expect(handleChange).toHaveBeenCalledTimes(2);
  });
});
