import React from "react";
import RichTextEditor from "components/RichTextEditor";
import Toolbar, {
  STYLE_BLOCK,
  STYLE_INLINE,
  buttons
} from "components/RichTextEditor/Toolbar";
import { shallow } from "enzyme";
import findById from "utils/findById";
import { RichUtils, Editor, EditorState, convertFromRaw } from "draft-js";

// https://github.com/facebook/draft-js/issues/702
jest.mock("draft-js/lib/generateRandomKey", () => () => "123");

let wrapper, props, editorNode;

const content = `
  <h2>List of styles:</h2>
  <ul>
    <li>Regular</li>
    <li><strong>Bold</strong></li>
    <li><em>Emphasis</em></li>
  </ul>
`;

describe("components/RichTextEditor", function() {
  beforeEach(() => {
    props = {
      onUpdate: jest.fn(),
      label: "I am a label",
      id: "test"
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

  it("should allow multiline input", () => {
    wrapper = shallow(<RichTextEditor {...props} multiline />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should store a reference to the editor DOM node", () => {
    wrapper.instance().setEditorNode(editorNode);
    expect(wrapper.instance().editor).toEqual(editorNode);
  });

  it("should focus upon click", () => {
    wrapper.instance().setEditorNode(editorNode);
    wrapper.find("#rte-click-context").simulate("click");
    expect(editorNode.focus).toHaveBeenCalled();
  });

  it("should store editorState in local state upon change event", () => {
    const editorState = EditorState.createEmpty();
    const handleChange = wrapper.find(Editor).prop("onChange");
    handleChange(editorState);
    expect(wrapper.state("editorState")).toBe(editorState);
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
    expect(props.onUpdate).toHaveBeenCalledWith({
      name: "test",
      value: `<p></p>\n`
    });
  });

  it("should call the relevant method to determine if the element is active", () => {
    const inlineStyle = findById(buttons, "bold");
    const blockElement = findById(buttons, "heading");

    const instance = wrapper.instance();
    instance.hasCurrentStyle = jest.fn();
    instance.getBlockType = jest.fn();

    instance.isActiveControl(inlineStyle);
    expect(instance.hasCurrentStyle).toHaveBeenCalled();

    instance.isActiveControl(blockElement);
    expect(instance.getBlockType).toHaveBeenCalled();
  });

  it("should remove carriage returns on paste", () => {
    const text = "hello\nworld";
    const handled = wrapper.instance().handlePaste(text);
    const html = wrapper.instance().getHTML();

    expect(handled).toBe("handled");
    expect(html).toContain("hello world");
  });

  it("should disable enter key", () => {
    expect(wrapper.instance().handleReturn()).toBe("handled");
  });
});
