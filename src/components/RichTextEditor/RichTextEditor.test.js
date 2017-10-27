import React from "react";
import RichTextEditor from "components/RichTextEditor";
import Toolbar, {
  STYLE_BLOCK,
  STYLE_INLINE,
  buttons
} from "components/RichTextEditor/Toolbar";
import { shallow } from "enzyme";
import findById from "utils/findById";
import { RichUtils, Editor, EditorState, convertToRaw } from "draft-js";
import Raw from "draft-js-raw-content-state";
import { createPipedEntity } from "./entities/PipedValue";
import { SynchronousPromise } from "synchronous-promise";

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
    wrapper = shallow(<RichTextEditor {...props} />, {
      disableLifecycleMethods: true
    });
    wrapper.instance().setEditorNode(editorNode);
    wrapper.find("#rte-click-context").simulate("click");

    expect(editorNode.focus).toHaveBeenCalled();
  });

  it("should store editorState in local state upon change event", () => {
    const editorState = EditorState.createEmpty();
    wrapper.find(Editor).simulate("change", editorState);
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
      value: "<p></p>"
    });
  });

  it("should call the relevant method to determine if the element is active", () => {
    const inlineStyle = findById(buttons, "bold");
    const blockElement = findById(buttons, "heading");

    const instance = wrapper.instance();
    instance.hasInlineStyle = jest.fn();
    instance.hasBlockStyle = jest.fn();

    instance.isActiveControl(inlineStyle);
    expect(instance.hasInlineStyle).toHaveBeenCalled();

    instance.isActiveControl(blockElement);
    expect(instance.hasBlockStyle).toHaveBeenCalled();
  });

  it("should remove carriage returns on paste", () => {
    const text = "hello\nworld";

    const handled = wrapper.find(Editor).prop("handlePastedText")(text);
    const html = wrapper.instance().getHTML();

    expect(handled).toBe("handled");
    expect(html).toContain("hello world");
  });

  it("should disable enter key", () => {
    var result = wrapper.find(Editor).prop("handleReturn")();
    expect(result).toBe("handled");
  });

  it("should set focus to true when Editor is focussed", () => {
    wrapper.find(Editor).simulate("focus");
    expect(wrapper.state("focused")).toBe(true);
  });

  it("should set focus to true when Toolbar is focused", () => {
    wrapper.find(Toolbar).simulate("focus");
    expect(wrapper.state("focused")).toBe(true);
  });

  it("should set focus to false when Toolbar is blurred", () => {
    wrapper.setState({ focused: true });
    wrapper.find(Toolbar).simulate("blur");
    expect(wrapper.state("focused")).toBe(false);
  });

  it("should be able to determine current block style", () => {
    const selection = {
      getStartKey: jest.fn(() => "selection")
    };
    const block = {
      getType: () => "block-type"
    };
    const currentContent = {
      getBlockForKey: jest.fn(() => block)
    };
    const editorState = {
      getCurrentContent: () => currentContent,
      getSelection: () => selection
    };

    let result = wrapper.instance().hasBlockStyle(editorState, "block-type");
    expect(result).toBe(true);
    expect(selection.getStartKey).toHaveBeenCalled();
    expect(currentContent.getBlockForKey).toHaveBeenCalledWith("selection");

    result = wrapper.instance().hasBlockStyle(editorState, "blah");
    expect(result).toBe(false);
  });

  it("should be able to determine current inline style", () => {
    const currentStyle = {
      has: jest.fn()
    };
    const editorState = {
      getCurrentInlineStyle: () => currentStyle
    };

    wrapper.instance().hasInlineStyle(editorState, "foo");
    expect(currentStyle.has).toHaveBeenCalledWith("foo");
  });

  describe("piping", () => {
    const toRaw = wrapper =>
      convertToRaw(wrapper.state("editorState").getCurrentContent());

    const createEntity = (type, mutability, data) => ({
      type,
      mutability,
      data
    });

    describe("existing piped values", () => {
      const answers = [
        { id: "1", label: "answer 1", type: "TextField" },
        { id: "2", label: "answer 2", type: "TextField" },
        { id: "3", label: "answer 3", type: "TextField" }
      ];

      let fetch;

      beforeEach(() => {
        fetch = jest.fn(() => SynchronousPromise.resolve(answers));
      });

      it("should load labels for piped answers when mounted", () => {
        const html = `<p><span data-piped="answers" data-id="1" data-type="TextField">[Piped Value]</span> <span data-piped="answers" data-id="2" data-type="TextField">[Piped Value]</span> <span data-piped="answers" data-id="3" data-type="TextField">[Piped Value]</span></p>`;

        wrapper = shallow(
          <RichTextEditor {...props} fetchAnswers={fetch} value={html} />
        );

        const expected = new Raw()
          .addBlock("[answer 1] [answer 2] [answer 3]")
          .addEntity(createPipedEntity(createEntity, answers[0]), 0, 10)
          .addEntity(createPipedEntity(createEntity, answers[1]), 11, 10)
          .addEntity(createPipedEntity(createEntity, answers[2]), 22, 10)
          .toRawContentState();

        expect(toRaw(wrapper)).toEqual(expected);
      });

      it("should not replace text for piped values that no longer exist", () => {
        const answer4 = { id: "4", type: "TextField" };
        const html = `<p><span data-piped="answers" data-id="4" data-type="TextField">[Piped Value]</span> <span data-piped="answers" data-id="2" data-type="TextField">[Piped Value]</span></p>`;

        wrapper = shallow(
          <RichTextEditor {...props} fetchAnswers={fetch} value={html} />
        );

        const expected = new Raw()
          .addBlock("[Piped Value] [answer 2]")
          .addEntity(createPipedEntity(createEntity, answer4), 0, 13)
          .addEntity(createPipedEntity(createEntity, answers[1]), 14, 10)
          .toRawContentState();

        expect(toRaw(wrapper)).toEqual(expected);
      });

      it("should do nothing if no entities are found", () => {
        wrapper = shallow(<RichTextEditor {...props} fetchAnswers={fetch} />);
        expect(fetch).not.toHaveBeenCalled();
      });
    });

    it("should allow for new piped values to be added", () => {
      const answer = {
        id: "123",
        label: "pipe",
        type: "TextField"
      };

      wrapper.find(Toolbar).simulate("piping", answer);

      const expected = new Raw()
        .addBlock("[pipe]")
        .addEntity(createPipedEntity(createEntity, answer), 0, 6)
        .toRawContentState();

      expect(toRaw(wrapper)).toEqual(expected);
    });
  });
});
