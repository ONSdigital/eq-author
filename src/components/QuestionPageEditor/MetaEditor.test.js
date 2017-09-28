import React from "react";
import { StatelessMetaEditor } from "./MetaEditor";
import { shallow, mount } from "enzyme";
import RichTextEditor from "components/RichTextEditor";

const noop = () => {};

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

    const input = wrapper.find(RichTextEditor).first();
    const ref = handleTitleRef.mock.calls[0][0];

    expect(input.matchesElement(ref)).toBe(true);
  });

  it("should invoke change and update onUpdate", () => {
    const editors = wrapper.find(RichTextEditor);
    expect(editors.length).toBeGreaterThan(0);

    editors.forEach((rte, i) => {
      const change = { name: "title", value: `<p>${i}</p>` };
      rte.simulate("update", change);

      expect(handleChange).toHaveBeenLastCalledWith(change, handleUpdate);
    });
  });
});
