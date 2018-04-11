import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import AnswerEditor from "./index";
import { Provider } from "react-redux";
import configureStore from "redux/configureStore";

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  width: 30em;
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
            id: "0",
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
        onChange={action("change")}
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

const store = configureStore();

const CenterDecorator = storyFn => (
  <Provider store={store}>
    <CenterXY>{storyFn()}</CenterXY>
  </Provider>
);

storiesOf("Answer Editor", module)
  .addDecorator(CenterDecorator)
  .add("Default", () => <AnswerEditorWrapper />);
