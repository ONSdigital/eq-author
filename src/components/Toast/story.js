import React from "react";
import { storiesOf } from "@storybook/react";
import Toast from "./index";
import ToastList from "./ToastList";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { colors } from "constants/theme";
import Transition from "./Transition";
import { without } from "lodash";

const UndoButton = styled.button`
  background: none;
  border: none;
  color: ${colors.lightBlue};
  margin-left: 2em;
  font-size: inherit;
`;

const DeletionInfo = props => (
  <div>
    Page deleted <UndoButton onClick={action("Deleted!")}>Undo</UndoButton>
  </div>
);

const StoryContainer = styled.div`
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  margin-bottom: ${props => (props.hasMargin ? "0.5em" : "0")};
`;

const StoryInner = styled.div`
  display: inline-block;
  text-align: initial;
`;

class Story extends React.Component {
  state = {
    toasts: [Date.now()]
  };

  handleAdd = () => {
    const toasts = this.state.toasts.concat(Date.now());
    this.setState({ toasts });
  };

  handleRemove = toast => {
    const toasts = without(this.state.toasts, toast);
    this.setState({ toasts });
  };

  renderToast = (toast, i) => {
    const date = new Date(toast);

    return (
      <Toast key={toast} id={toast} onClose={this.handleRemove} timeout={5000}>
        <div>
          Toast added at: <strong>{date.toLocaleTimeString()}</strong>
        </div>
      </Toast>
    );
  };

  render() {
    return (
      <div>
        <div>
          <button type="button" onClick={this.handleAdd}>
            Add toast
          </button>
        </div>
        <StoryContainer>
          <StoryInner>
            <ToastList transition={Transition}>
              {this.state.toasts.map(this.renderToast)}
            </ToastList>
          </StoryInner>
        </StoryContainer>
      </div>
    );
  }
}

storiesOf("Toast", module)
  .add("Default", () => (
    <StoryContainer hasMargin>
      <StoryInner>
        <Toast>
          <span>Hello world!</span>
        </Toast>
      </StoryInner>
    </StoryContainer>
  ))
  .add("Auto timeout", () => (
    <StoryContainer hasMargin>
      <StoryInner>
        <Toast id="bar" timeout={2000} onClose={action("Auto-closed")}>
          <span>Hello world!</span>
        </Toast>
      </StoryInner>
    </StoryContainer>
  ))
  .add("Arbitrary content", () => (
    <StoryContainer hasMargin>
      <StoryInner>
        <Toast id="foo" timeout={2000} onClose={action("Auto-closed")}>
          <DeletionInfo />
        </Toast>
      </StoryInner>
    </StoryContainer>
  ))
  .add("List", () => (
    <StoryContainer>
      <StoryInner>
        <ToastList>
          <Toast id="1">
            <div>Hello</div>
          </Toast>
          <Toast id="2">
            <div>World</div>
          </Toast>
        </ToastList>
      </StoryInner>
    </StoryContainer>
  ))
  .add("Interactive", () => <Story />);
