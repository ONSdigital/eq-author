import React from "react";
import RichTextArea from "components/RichTextArea";
import { mount } from "enzyme";

describe("rich text area", () => {
  describe("internal state the component", () => {
    it("should default its state to the value passed in via props", () => {
      const initialValue = "Should be in state";
      const wrapper = mount(<RichTextArea value={initialValue} />);
      expect(wrapper.state().value._cache.html).toEqual(initialValue);
    });

    it("should update its state if the value prop changes", () => {
      const initialValue = "Initial value";
      let wrapper = mount(<RichTextArea value={initialValue} />);

      const newValue = "New value";
      wrapper = mount(<RichTextArea value={newValue} />);

      expect(wrapper.state().value._cache.html).toEqual(newValue);
    });
  });

  describe("toolbar configuration", () => {
    it("should have Bold button", () => {
      const wrapper = mount(<RichTextArea />);
      expect(wrapper.find("[title='Bold']").length).toEqual(1);
    });

    it("should have Italic button", () => {
      const wrapper = mount(<RichTextArea />);
      expect(wrapper.find("[title='Italic']").length).toEqual(1);
    });

    it("should have UL button", () => {
      const wrapper = mount(<RichTextArea />);
      expect(wrapper.find("[title='UL']").length).toEqual(1);
    });

    it("should have OL button", () => {
      const wrapper = mount(<RichTextArea />);
      expect(wrapper.find("[title='OL']").length).toEqual(1);
    });
  });

});
