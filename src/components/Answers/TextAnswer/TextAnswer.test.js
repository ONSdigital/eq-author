import React from "react";
import { shallow } from "enzyme";
import TextAnswer from "components/Answers/TextAnswer";

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
      <TextAnswer
        answer={answer}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
