import React from "react";
import { shallow } from "enzyme";
import { StatelessSectionEditor } from "components/SectionEditor";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";
import SeamlessTextArea from "components/SeamlessTextArea/SeamlessTextArea";

describe("SectionEditor", () => {
  const section = {};
  let wrapper;
  let handleChange = jest.fn();
  let handleUpdate = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <StatelessSectionEditor
        section={section}
        onChange={handleChange}
        onUpdate={handleUpdate}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke change callback onChange", () => {
    wrapper.find(SeamlessInput).simulate("change");
    wrapper.find(SeamlessTextArea).simulate("change");
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("should invoke update callback onBlur", () => {
    wrapper.find(SeamlessInput).simulate("blur");
    wrapper.find(SeamlessTextArea).simulate("blur");
    expect(handleUpdate).toHaveBeenCalledTimes(2);
  });
});
