import React from "react";
import { shallow } from "enzyme";
import { UnwrappedSectionEditor } from "components/SectionEditor";
import RichTextEditor from "components/RichTextEditor";

describe("SectionEditor", () => {
  const section = {};
  let wrapper;
  let handleChange = jest.fn();
  let handleUpdate = jest.fn();
  let handleDeleteSection = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <UnwrappedSectionEditor
        section={section}
        onChange={handleChange}
        onUpdate={handleUpdate}
        onDeleteSection={handleDeleteSection}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should invoke change and update callbacks onUpdate", () => {
    const editors = wrapper.find(RichTextEditor);
    expect(editors.length).toBeGreaterThan(0);

    editors.forEach((rte, i) => {
      const change = { name: "title", value: `<p>${i}</p>` };
      rte.simulate("update", change);

      expect(handleChange).toHaveBeenLastCalledWith(change, handleUpdate);
    });
  });
});
