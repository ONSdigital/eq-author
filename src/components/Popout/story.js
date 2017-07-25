import React from "react";
import { storiesOf } from "@storybook/react";
import Popout, { UncontrolledPopout } from "./index";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Trigger = styled.button`
  border-radius: 2px;
  box-shadow: none;
  border: 1px solid #ccc;
  background: white;
  padding: 1em 2em;
  outline: none;

  &:active {
    background-color: #eee;
  }
`;

const FADE_TIMEOUT = 250;

const CloseButton = styled.button`
  border: none;
  background: none;
  position: absolute;
  top: 2em;
  right: 2em;
  font-size: 1em;
  font-weight: bold;
  color: #444;
  text-transform: uppercase;
`;

const Menu = styled.div`
  background-color: white;
  padding: 2em;
  box-shadow: rgba(0, 0, 0, 0.16) 0 5px 20px 0px;
  width: 340px;
  transition: opacity ${FADE_TIMEOUT}ms;

  &.fade-enter {
    opacity: 0;
  }
  &.fade-enter-active {
    opacity: 1;
  }
  &.fade-exit {
    opacity: 1;
  }
  &.fade-exit-active {
    opacity: 0;
  }
`;

const CenterXY = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;

class Fade extends React.Component {
  static defaultProps = {
    in: false,
    timeout: FADE_TIMEOUT
  };
  render() {
    return <CSSTransition {...this.props} classNames="fade" />;
  }
}

const CenterDecorator = storyFn =>
  <CenterXY>
    {storyFn()}
  </CenterXY>;

const trigger = <Trigger>Click me</Trigger>;
const Content = ({ onClose }) =>
  <Menu>
    <CloseButton onClick={onClose}>×</CloseButton>
    <h2>Hello world</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. In ut ratione
      impedit, culpa cupiditate atque distinctio placeat. Beatae nam voluptas
      magnam, repellendus alias in officia nemo, voluptatum est velit vitae
    </p>
  </Menu>;

storiesOf("Popout", module)
  .addDecorator(CenterDecorator)
  .addDecorator(withKnobs)
  .add("Stateless", () =>
    <Popout
      open={boolean("open", false)}
      trigger={trigger}
      onToggleOpen={action("toggle open")}
    >
      <Content />
    </Popout>
  )
  .add("Stateful", () =>
    <UncontrolledPopout trigger={trigger}>
      <Content />
    </UncontrolledPopout>
  )
  .add("Animated", () =>
    <UncontrolledPopout trigger={trigger} transition={Fade}>
      <Content />
    </UncontrolledPopout>
  );
