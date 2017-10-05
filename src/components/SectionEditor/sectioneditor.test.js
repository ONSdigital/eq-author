import React from "react";
import { shallow } from "enzyme";
import { StatelessSectionEditor } from "components/SectionEditor";
import RichTextEditor from "components/RichTextEditor";

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
