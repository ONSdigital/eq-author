import React from "react";
import RichTextEditor from "components/RichTextEditor";
import Toolbar, {
  STYLE_BLOCK,
  STYLE_INLINE
} from "components/RichTextEditor/Toolbar";
import { shallow, mount } from "enzyme";
import content from "./testContent";
import { RichUtils, Editor, EditorState } from "draft-js";

// https://github.com/facebook/draft-js/issues/702
jest.mock("draft-js/lib/generateRandomKey", () => () => "123");

let wrapper, props, editorNode;

describe("components/RichTextEditor", function() {
  beforeEach(() => {
    props = {
      onUpdate: jest.fn(),
      label: "I am a label"
    };
    editorNode = {
      focus: jest.fn()
    };
    wrapper = shallow(<RichTextEditor {...props} />);
  });

  it("should render", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render existing content", () => {
    wrapper = shallow(<RichTextEditor {...props} value={content} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should store a reference to the editor DOM node", () => {
    wrapper.instance().getEditorNode(editorNode);
    expect(wrapper.instance().editor).toEqual(editorNode);
  });

  it("should focus upon click", () => {
    wrapper.instance().getEditorNode(editorNode);
    wrapper.find("#rte-click-context").simulate("click");
    expect(editorNode.focus).toHaveBeenCalled();
  });

  it("should set focus state to true upon focus", () => {
    wrapper.find(Editor).simulate("focus");
    expect(wrapper.state("focus")).toBe(true);
  });

  it("should store editorState in local state upon change event", () => {
    const editorState = EditorState.createEmpty();
    wrapper = mount(<RichTextEditor {...props} />);
    wrapper.find(Editor).simulate("change", { editorState });
    expect(wrapper.state("editorState")).toEqual(editorState);
  });

  it("should handle toggling a control", () => {
    const toolbar = wrapper.find(Toolbar);
    const handleChange = jest.fn();
    wrapper.instance().handleChange = handleChange;

    toolbar.simulate("toggle", { type: STYLE_BLOCK, style: "heading" });
    expect(RichUtils.toggleBlockType).toHaveBeenCalled();
    toolbar.simulate("toggle", { type: STYLE_INLINE, style: "heading" });
    expect(RichUtils.toggleInlineStyle).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(2);
  });

  it("should call onUpdate with raw editor state onBlur", () => {
    wrapper.find(Editor).simulate("blur");
    expect(props.onUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        entityMap: expect.any(Object),
        blocks: expect.any(Array)
      })
    );
    expect(wrapper.state("focus")).toBe(false);
  });
});
