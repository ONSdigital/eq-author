import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import AnswerEditor from "./index";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

class AnswerEditorWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      answer: {
        id: "1",
        type: "Checkbox",
        label: "Label",
        description: "Section description",
        options: [
          {
            id: 0,
            label: "Option 1",
            description: "Option 1 description"
          }
        ]
      }
    };
  }

  render() {
    return (
      <AnswerEditor
        answer={this.state.answer}
        onAddOption={action("addOption")}
        onUpdate={action("onUpdate")}
        onDeleteAnswer={action("deleteAnswer")}
        onUpdateOption={action("onUpdateOption")}
        onDeleteOption={action("deleteOption")}
      />
    );
  }
}

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

storiesOf("Answer Editor", module)
  .addDecorator(CenterDecorator)
  .add("Default", () => <AnswerEditorWrapper />);
