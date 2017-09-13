import React from "react";
import { StatelessMetaEditor } from "./MetaEditor";
import { shallow, mount } from "enzyme";
import SeamlessInput from "components/SeamlessInput/SeamlessInput";

describe("MetaEditor", () => {
  let wrapper, handleUpdate, handleChange, handleTitleRef, page;

  const render = (renderer = shallow) =>
    renderer(
      <StatelessMetaEditor
        onChange={handleChange}
        onUpdate={handleUpdate}
        titleRef={handleTitleRef}
        page={page}
      />
    );

  beforeEach(() => {
    handleChange = jest.fn();
    handleUpdate = jest.fn();
    handleTitleRef = jest.fn();
    page = {
      title: "Page title",
      description: "Page description",
      guidance: "Page guidance"
    };

    wrapper = render();
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should expose title input as ref", () => {
    wrapper = render(mount);

    const input = wrapper.find(SeamlessInput).first();
    const ref = handleTitleRef.mock.calls[0][0];

    expect(input.matchesElement(ref)).toBe(true);
  });

  it("should invoke change callback onChange", () => {
    wrapper.find(SeamlessInput).forEach(input => input.simulate("change"));
    expect(handleChange).toHaveBeenCalledTimes(3);
  });

  it("should invoke update callback onBlur", () => {
    wrapper.find(SeamlessInput).forEach(input => input.simulate("blur"));
    expect(handleUpdate).toHaveBeenCalledTimes(3);
  });
});
