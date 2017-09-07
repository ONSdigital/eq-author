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
  let handleChange;
  let wrapper;

  beforeEach(() => {
    handleChange = jest.fn();
    wrapper = shallow(<TextAnswer onChange={handleChange} answer={answer} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke callback on blur", () => {
    wrapper.find(SeamlessInput).simulate("blur");
    wrapper.find(SeamlessTextArea).simulate("blur");

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenCalledWith(answer);
  });
});
